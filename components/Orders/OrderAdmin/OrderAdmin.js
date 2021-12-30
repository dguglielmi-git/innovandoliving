import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import BasicLoading from "../../BasicLoading/BasicLoading";
import OrderDetails from "../Order/content/OrderDetails";
import ActiveClosedTabs from "./ActiveClosedTabs";
import { USER_OWNER } from "../../../utils/constants";
import useAuth from "../../../hooks/useAuth";
import { getFinishedOrdersApi, getOrdersApi } from "../../../api/order";

export default function OrderAdmin() {
    const { logout } = useAuth();
    const [showDetail, setShowDetail] = useState(false);
    const [orderSelected, setOrderSelected] = useState({});
    const [orders, setOrders] = useState([]);
    const [finishedOrders, setFinishedOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [reloadOrder, setReloadOrder] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        (async () => {
            setLoading(true);
            const result = await getOrdersApi(logout);
            const totalOrders = await result.json();
            setOrders(totalOrders);

            const closedOrders = await getFinishedOrdersApi(logout);
            const totalClosedOrders = await closedOrders.json();
            setFinishedOrders(totalClosedOrders);

            setLoading(false);
        })()
        setReloadOrder(false);
    }, [reloadOrder]);


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