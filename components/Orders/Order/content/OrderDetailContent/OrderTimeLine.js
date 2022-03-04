import React from "react";
import { Timeline } from 'primereact/timeline';

export default function OrderTimeLine(props) {
    const { historyStatus, drawTimeLineOfOrder } = props;

    return (
        <div className="order-detail__mainbox-timeline">
            <Timeline
                value={ drawTimeLineOfOrder(historyStatus) }
                content={ (item) => item.status } />
        </div>
    )
}