import React, { useState, useEffect } from 'react';
import { size } from 'lodash';
import OrderDetails from './content/OrderDetails';
import OrderTitle from './content/sections/OrderTitle';
import EmptyOrders from './content/sections/EmptyOrders';
import ShowListOfOrders from './content/sections/ShowListOfOrders';
import useAuth from "../../../hooks/useAuth";
import useMsgs from '../../../hooks/useMsgs';
import { getOrdersApi } from "../../../api/order";
import { USER_CLIENT } from "../../../utils/constants";

export default function Order(props) {
    const { logout } = useAuth();
    const [orders, setOrders] = useState([]);
    const [orderSelected, setOrderSelected] = useState({});
    const [showDetail, setShowDetail] = useState(false);
    const [reloadOrder, setReloadOrder] = useState(false);
    const { ordersCounter } = useMsgs();

    useEffect(() => {
        (async () => {
            const result = await getOrdersApi(logout);
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

    if (orders === []) {
        return < EmptyOrders />
    }

    return (
        <div className="order">
            <OrderTitle />
            <ShowListOfOrders
                showDetail={ showDetail }
                orders={ orders }
                setOrderSelected={ setOrderSelected }
                setShowDetail={ setShowDetail }
            />
            <div className="order-detail">
                { showDetail && <OrderDetails
                    setShowDetail={ setShowDetail }
                    order={ orderSelected }
                    setReloadOrder={ setReloadOrder }
                    userType={ USER_CLIENT }
                /> }
            </div>
        </div>
    )
}