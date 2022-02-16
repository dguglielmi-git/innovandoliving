import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import ActiveClosedTabs from "./ActiveClosedTabs";
import { USER_OWNER } from "../../../utils/constants";
import OrderDetails from "../Order/content/OrderDetails";
import BasicLoading from "../../BasicLoading/BasicLoading";
import useAuth from "../../../hooks/useAuth";
import useMsgs from "../../../hooks/useMsgs";
import { getFinishedOrdersApi, getOrdersApi } from "../../../api/order";
import { size } from "lodash";

export default function OrderAdmin() {
    const { logout } = useAuth();
    const [showDetail, setShowDetail] = useState(false);
    const [orders, setOrders] = useState([]);
    const [orderSelected, setOrderSelected] = useState({});
    const [finishedOrders, setFinishedOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [reloadOrder, setReloadOrder] = useState(false);
    const { ordersCounter } = useMsgs();
    const { t } = useTranslation();

    useEffect(() => {
        (async () => {
            setLoading(true);
            const result = await getOrdersApi(logout);
            const totalOrders = await result.json();
            setOrders(totalOrders);

            if (size(totalOrders) > 0 && totalOrders.error === undefined) {
                totalOrders.map(order => {
                    if (order._id === orderSelected._id) {
                        setOrderSelected(order);
                    }
                })
            }

            const closedOrders = await getFinishedOrdersApi(logout);
            const totalClosedOrders = await closedOrders.json();
            setFinishedOrders(totalClosedOrders);

            setLoading(false);
        })()
        setReloadOrder(false);
    }, [reloadOrder, ordersCounter]);


    return (
        <div className="order-admin">
            { loading && <BasicLoading label={ t('orderLoading') } /> }
            { !showDetail ?
                <ActiveClosedTabs
                    orders={ orders }
                    showDetail={ showDetail }
                    setShowDetail={ setShowDetail }
                    setOrderSelected={ setOrderSelected }
                    finishedOrders={ finishedOrders }
                />
                :
                <div className="order">
                    <div className="order-detail">
                        <OrderDetails
                            setShowDetail={ setShowDetail }
                            order={ orderSelected }
                            setReloadOrder={ setReloadOrder }
                            userType={ USER_OWNER }
                        />
                    </div>
                </div>
            }
        </div>
    )
}