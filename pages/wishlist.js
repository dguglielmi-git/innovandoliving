import React, { useState, useEffect } from 'react';
import { size, forEach } from "lodash";
import { Loader } from "semantic-ui-react";
import BasicLayout from "../layouts/BasicLayout";
import { getFavoriteApi } from "../api/favorite";
import useAuth from "../hooks/useAuth";
import { useTranslation } from "react-i18next";
import ListProductos from "../components/ListProductos";
import "../locales/i18n";

export default function wishlist() {
    const { t } = useTranslation();
    const [productos, setProductos] = useState(null);
    const { auth, logout } = useAuth();

    useEffect(() => {
        (async () => {
            const response = await getFavoriteApi(auth.idUser, logout);
            if (size(response) > 0) {
                const productoList = [];
                forEach(response, (data) => {
                    productoList.push(data.producto);
                });
                setProductos(productoList);
            } else {
                setProductos([]);
            }
        })();
    }, []);
    return (
        <BasicLayout className="wishlist">
            <div className="wishlist__block">
                <div className="title">{t('wishlistTitle')}</div>

                <div className="data">
                    {!productos && <Loader active>{t('wishlistLoadingProducts')}</Loader>}
                    {productos && size(productos) === 0 && (
                        <div className="data__not-found">
                            <h3>{t('wishlistNotProductsOnList')}</h3>
                        </div>
                    )}
                    {size(productos) > 0 && <ListProductos productos={productos} />}
                </div>
            </div>
        </BasicLayout>
    )
}
