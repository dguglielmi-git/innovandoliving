import React from "react";
import BasicLayout from "../layouts/BasicLayout";
import { getEntries } from "../utils/util";
import SuccessfulPayment from "../components/Cart/SuccessfulPayment"

export default function SuccessfulPay(props) {
    const params = new URLSearchParams(window.location.search);
    const incomingData = getEntries(params.entries());

    return (
        <BasicLayout>
            <SuccessfulPayment incomingData={ incomingData } />
        </BasicLayout>
    )
}
