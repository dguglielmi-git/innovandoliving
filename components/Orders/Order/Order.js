import React, { useState } from 'react';
import OrderTable from './content/OrderTable';
import OrderDetails from './content/OrderDetails';

export default function Order(props) {
    const { t } = props;
    const [showDetail, setShowDetail] = useState(true);

    const toggleDetail = () => setShowDetail(!showDetail);

    return (
        <div className="order">
            <div className="order-title">
                <h4>Mis Pedidos</h4>
            </div>
            <div className="order-table">
                { !showDetail && <OrderTable t={ t } /> }
            </div>
            <div className="order-detail">
                { showDetail && <OrderDetails /> }
            </div>
        </div>
    )
}