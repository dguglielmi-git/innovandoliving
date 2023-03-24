import React from 'react';
import BasicLayout from '../layouts/BasicLayout';
import FailurePayment from '../components/Cart/FailurePayment/FailurePayment';
import { getEntries } from '../utils/util';

export default function FailurePay(props) {
    const params = new URLSearchParams(window.location.search);
    const result = getEntries(params.entries());

    return (
        <BasicLayout>
            <FailurePayment incomingData={ result } />
        </BasicLayout>
    )
}