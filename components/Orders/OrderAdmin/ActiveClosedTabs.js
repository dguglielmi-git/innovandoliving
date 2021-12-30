import React from "react";
import { TabView, TabPanel } from 'primereact/tabview';
import ActiveOrders from "./Tables/ActiveOrders/ActiveOrders"
import ClosedOrders from "./Tables/ClosedOrders/ClosedOrders";

export default function ActiveClosedTabs(props) {
    const {
        orders,
        showDetail,
        setShowDetail,
        setOrderSelected,
        finishedOrders } = props;

    return (
        <TabView>
            <TabPanel header="Active Orders">
                <div className="order-admin__table">
                    <ActiveOrders
                        orders={ orders }
                        showDetail={ showDetail }
                        setShowDetail={ setShowDetail }
                        setOrderSelected={ setOrderSelected }
                    />
                </div>
            </TabPanel>
            <TabPanel header="Closed Orders">
                <div className="order-admin__table">
                    <ClosedOrders
                        orders={ finishedOrders }
                        showDetail={ showDetail }
                        setShowDetail={ setShowDetail }
                        setOrderSelected={ setOrderSelected }
                    />
                </div>
            </TabPanel>
        </TabView>
    )
}