import React, { useState, useEffect } from "react";
import { size } from "lodash";
import { useRouter } from "next/router";
import { Loader } from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import ListProductos from "../ListProductos";
import { searchProductByTitle } from "../../api/producto";

export default function Search() {
    const { t } = useTranslation();
    const [productos, setProductos] = useState(null);
    const { query } = useRouter();

    useEffect(() => {
        document.getElementById("search-product").focus();
    }, []);

    useEffect(() => {
        (async () => {
            if (size(query.query) > 0) {
                const response = await searchProductByTitle(query.query);
                if (size(response) > 0) setProductos(response);
                else setProductos([]);
            } else {
                setProductos([]);
            }
        })()
    }, [query]);

    return (
        <div>
            { !productos && <Loader active>{ t('searchLoadingProducts') }</Loader> }

            { productos && size(productos) === 0 && (
                <div>
                    <h3>{ t('searchProductsNotFound') }</h3>
                </div>
            ) }

            { size(productos) > 0 && <ListProductos productos={ productos } /> }
        </div>
    )
}