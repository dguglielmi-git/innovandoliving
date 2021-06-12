import React, { useState, useEffect } from 'react';
import { Grid } from "semantic-ui-react";
import { size, map } from "lodash";
import BasicLayout from "../layouts/BasicLayout";
import { getOrdersApi } from "../api/order";
import useAuth from "../hooks/useAuth";
import Order from "../components/Orders/Order";
import { useTranslation } from "react-i18next";
import Seo from "../components/Seo";
import "../locales/i18n";

export default function orders() {
    const { t } = useTranslation();
    const [orders, setOrders] = useState(null);
    const { auth, logout } = useAuth();

    useEffect(() => {
        (async () => {
            const response = await getOrdersApi(auth.idUser, logout);
            setOrders(response || []);
        })();
    }, []);
    return (
        <BasicLayout className="orders">
            <Seo />
            <div className="orders__block">
                <div className="title">{t('ordersMyOrders')}</div>
                <div className="data">
                    {size(orders) === 0 ? (
                        <h2 style={{ textAlign: "center" }}>
                            {t('ordersNotOrdersFound')}
                        </h2>
                    ) : (
                        <OrderList orders={orders} />
                    )}
                    <p>{t('ordersOrderList')}</p>
                </div>
            </div>
        </BasicLayout>
    )
}

function OrderList(props) {
    const { orders } = props;

    return (
        <Grid>
            {map(orders, (order) => (
                <Grid.Column mobile={16} tablet={6} computer={8}>
                    <Order order={order} />
                </Grid.Column>
            ))}
        </Grid>
    )
}

