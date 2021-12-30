import React from "react";
import { Table } from 'semantic-ui-react';
import ActiveTable from "../../OrderAdmin/Tables/ActiveOrders/ActiveTable";
import ClosedTable from "../../OrderAdmin/Tables/ClosedOrders/ClosedTable";

export default function OrderTable(props) {
    const {
        orders,
        setOrderSelected,
        setShowDetail,
        tableType,
        userType } = props;

    const openDetails = (order) => {
        setOrderSelected(order);
        setShowDetail(true);
    }

    return (
        <Table color='teal' key='teal'>
            { tableType === "active"
                ? <ActiveTable
                    orders={ orders }
                    openDetails={ openDetails }
                    userType={ userType }
                />
                : <ClosedTable
                    orders={ orders }
                    openDetails={ openDetails }
                />
            }
        </Table>
    )
}