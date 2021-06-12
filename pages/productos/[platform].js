import React, { useState, useEffect } from 'react';
import BasicLayout from "../../layouts/BasicLayout";
import { Loader } from "semantic-ui-react";
import { useRouter } from "next/router";
import { size } from "lodash";
import { useTranslation } from "react-i18next";
import { getProductosPlatformApi, getTotalProductosPlatform } from "../../api/producto";
import ListProductos from "../../components/ListProductos";
import Pagination from "../../components/Pagination";
import "../../locales/i18n";

const limitPerPage = 20;

export default function Platform() {
    // const router = useRouter();
    // console.log(router);
    const { query } = useRouter();
    const { t } = useTranslation();
    const [productos, setProductos] = useState(null);
    const [totalProductos, setTotalProductos] = useState(null);

    const getStartItem = () => {
        const currentPages = parseInt(query.page);
        if (!query.page || currentPages === 1) return 0;
        else return currentPages * limitPerPage - limitPerPage;
    }
    useEffect(() => {
        (async () => {
            if (query.platform) {
                const response = await getProductosPlatformApi(
                    query.platform,
                    limitPerPage,
                    getStartItem());
                setProductos(response);
            }
        })()
    }, [query]);

    useEffect(() => {
        (async () => {
            const response = await getTotalProductosPlatform(query.platform);
            setTotalProductos(response);
        })()
    }, [query]);

    return (
        <BasicLayout>
            {!productos && <Loader active>{t('productosPlatformLoadingProds')}</Loader>}
            {productos && size(productos) === 0 && (
                <div><h3>{t('productosPlatformNotProductFound')}</h3></div>
            )}
            {size(productos) > 0 && <ListProductos productos={productos} />}

            {totalProductos
                ? (
                    <Pagination
                        totalProductos={totalProductos}
                        page={query.page ?
                            parseInt(query.page) : 1}
                        limitPerPage={limitPerPage}
                    />
                ) : null}
        </BasicLayout>
    )
}
