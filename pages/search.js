import React, { useState, useEffect } from 'react';
import { Loader } from "semantic-ui-react";
import { useRouter } from "next/router";
import { size } from "lodash";
import BasicLayout from "../layouts/BasicLayout";
import { searchProductosApi } from "../api/producto";
import { useTranslation } from "react-i18next";
import ListProductos from "../components/ListProductos";
import "../locales/i18n";

export default function Search() {
    const { t } = useTranslation();
    const [productos, setProductos] = useState(null);
    const { query } = useRouter();

    useEffect(() => {
        document.getElementById("search-producto").focus();
    }, []);

    useEffect(() => {
        (async () => {
            if (size(query.query) > 0) {
                const response = await searchProductosApi(query.query);
                if (size(response) > 0) setProductos(response);
                else setProductos([]);
            } else {
                setProductos([]);
            }
        })()
    }, [query]);
    return (
        <BasicLayout className="search">
            {!productos && <Loader active>{t('searchLoadingProducts')}</Loader>}
            {productos && size(productos) === 0 && (
                <div>
                    <h3>{t('searchProductsNotFound')}</h3>
                </div>
            )}
            {size(productos) > 0 && <ListProductos productos={productos} />}
        </BasicLayout>
    )
}
