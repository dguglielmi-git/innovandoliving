import React, { useState, useEffect } from 'react';
import { size } from 'lodash';
import useAuth from "../../../hooks/useAuth";
import useMsgs from '../../../hooks/useMsgs';
import { getOrdersApi } from "../../../api/order";
import { USER_CLIENT } from "../../../utils/constants";
import OrderDetails from './content/OrderDetails';
import OrderTitle from './content/sections/OrderTitle';
import EmptyOrders from './content/sections/EmptyOrders';
import ShowListOfOrders from './content/sections/ShowListOfOrders';

export default function Order() {
    const { logout } = useAuth();
    const [orders, setOrders] = useState([]);
    const [orderSelected, setOrderSelected] = useState({});
    const [showDetail, setShowDetail] = useState(false);
    const [reloadOrder, setReloadOrder] = useState(false);
    const { ordersCounter } = useMsgs();

    useEffect(() => {
        (async () => {
            const result = await getOrdersApi(logout);
            console.log(result)
            const data = await result.json();

            const tmpOrder = [];
            if (size(data) > 0 && data.error === undefined) {
                data.map(order => {
                    tmpOrder.push(order)
                    if (order._id === orderSelected._id) {
                        setOrderSelected(order);
                    }
                })
                setOrders(tmpOrder);
            }
        })()
        setReloadOrder(false);
    }, [reloadOrder, ordersCounter])

    if (orders === []) return < EmptyOrders />

    return (
        <div className="order">
            <OrderTitle />
            <ShowListOfOrders
                orders={ orders }
                showDetail={ showDetail }
                setShowDetail={ setShowDetail }
                setOrderSelected={ setOrderSelected }
            />
            <div className="order-detail">
                { showDetail && <OrderDetails
                    order={ orderSelected }
                    userType={ USER_CLIENT }
                    setShowDetail={ setShowDetail }
                    setReloadOrder={ setReloadOrder }
                /> }
            </div>
        </div>
    )
}