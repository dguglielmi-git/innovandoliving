import React from "react";
import { USER_OWNER } from "../../../../../utils/constants";
import OrderTable from "../../../Order/content/OrderTable";

export default function ClosedOrders(props) {
    const {
        orders,
        showDetail,
        setShowDetail,
        setOrderSelected } = props;

    return (
        <div className="order-admin__table-fixed">
            { !showDetail &&
                <OrderTable
                    orders={ orders }
                    setOrderSelected={ setOrderSelected }
                    setShowDetail={ setShowDetail }
                    tableType="closed"
                    userType={ USER_OWNER }
                />
            }
        </div>
    )
}