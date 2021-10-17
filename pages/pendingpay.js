import React from "react";
import { getEntries } from "../utils/util";
import BasicLayout from "../layouts/BasicLayout";
import PendingPayment from "../components/Cart/PendingPayment/PendingPayment";

export default function PendingPay(props) {
    const params = new URLSearchParams(window.location.search);
    const result = getEntries(params.entries());
    
    return (
        <BasicLayout>
            <PendingPayment incomingData={ result } />
        </BasicLayout>

    )
}