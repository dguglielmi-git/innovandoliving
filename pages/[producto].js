import React, { useState, useEffect } from 'react';
import { useRouter } from "next/router";
import BasicLayout from "../layouts/BasicLayout";
import { getProductoByUrlApi } from "../api/producto";
import HeaderProducto from "../components/Producto/HeaderProducto";
import TabsProducto from "../components/Producto/TabsProducto";
import useMsgs from '../hooks/useMsgs';

export default function Producto() {
    const [producto, setProducto] = useState(null);
    const { query } = useRouter();
    const { queryCounter } = useMsgs();

    useEffect(() => {
        (async () => {
            const response = await getProductoByUrlApi(query.producto);
            setProducto(response);
        })()
    }, []);


    if (!producto) return null;

    return (
        <BasicLayout className="producto">
            <HeaderProducto producto={ producto } />
            <TabsProducto producto={ producto } />
        </BasicLayout>
    )
}
