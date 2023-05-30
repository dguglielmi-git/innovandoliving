import React from "react";
import OrderTable from "../OrderTable";
import { USER_CLIENT } from "../../../../../utils/constants";

export default function ShowListOfOrders(props) {
    const { showDetail, orders, setOrderSelected, setShowDetail } = props;

    if (showDetail) return null;

    return (
        <div className="order-table">
            <OrderTable
                orders={ orders }
                setOrderSelected={ setOrderSelected }
                setShowDetail={ setShowDetail }
                tableType="active"
                userType={ USER_CLIENT }
            />
        </div>
    )
}