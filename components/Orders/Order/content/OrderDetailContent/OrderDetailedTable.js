import React from "react";
import ItemsTable from "../ItemsTable";

export default function OrderDetailedTable(props) {
    const { order } = props;
    return (
        <div className="order-detail__mainbox-items">
            <div className="order-detail__mainbox-items-details">
                <ItemsTable items={ order.items } />
            </div>
        </div>
    )
}