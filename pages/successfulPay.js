import React from "react";
import BasicLayout from "../layouts/BasicLayout";
import { getEntries } from "../utils/util";
import SuccessfulPayment from "../components/Cart/SuccessfulPayment"

export default function SuccessfulPay() {
    const params = new URLSearchParams(window.location.search);
    const incomingData = getEntries(params.entries());
    const { payment_method } = incomingData;

    return (
        <BasicLayout>
            <SuccessfulPayment
                incomingData={ incomingData }
                paymentMethod={ payment_method }
            />
        </BasicLayout>
    )
}
