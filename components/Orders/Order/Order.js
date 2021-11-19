import React, { useState, useEffect } from 'react';
import OrderTable from './content/OrderTable';
import OrderDetails from './content/OrderDetails';
import { getOrdersApi } from "../../../api/order";
import useAuth from "../../../hooks/useAuth";

export default function Order(props) {
    const { t } = props;
    const { logout } = useAuth();
    const [reloadOrder, setReloadOrder] = useState(false);
    const [showDetail, setShowDetail] = useState(false);
    const [orders, setOrders] = useState([]);
    const [orderSelected, setOrderSelected] = useState({});

    useEffect(() => {
        (async () => {
            const result = await getOrdersApi(logout);
            const data = await result.json();

            const tmpOrder = [];
            data.map(order => {
                tmpOrder.push(order)
                if (order._id === orderSelected._id) {
                    setOrderSelected(order);
                }
            })
            setOrders(tmpOrder);
        })()
        setReloadOrder(false);
    }, [reloadOrder])

    if (orders === []) {
        return (
            <div className="order-title">
                <h4>Mis Pedidos</h4>
                <p>No hay pedidos.</p>
            </div>
        )
    }


    return (
        <div className="order">

            <div className="order-title">
                <h4>Mis Pedidos</h4>
            </div>
            <div className="order-table">
                { !showDetail && <OrderTable
                    t={ t }
                    orders={ orders }
                    setOrderSelected={ setOrderSelected }
                    setShowDetail={ setShowDetail }
                /> }
            </div>
            <div className="order-detail">
                { showDetail && <OrderDetails
                    setShowDetail={ setShowDetail }
                    order={ orderSelected }
                    setReloadOrder={ setReloadOrder }
                /> }
            </div>
        </div>
    )
}