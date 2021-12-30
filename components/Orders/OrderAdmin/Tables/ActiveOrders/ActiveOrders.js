import React from "react";
import OrderTable from "../../../Order/content/OrderTable";
import useAuth from "../../../../../hooks/useAuth";
import { USER_OWNER } from "../../../../../utils/constants";

export default function ActiveOrders(props) {
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
                    tableType="active"
                    userType={ USER_OWNER }
                />
            }
        </div>
    )
}