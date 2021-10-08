import React, { useEffect } from "react";
import BasicLayout from "../layouts/BasicLayout";
import { getEntries } from "../utils/util";
import useAuth from  "../hooks/useAuth"
import useCart from "../hooks/useCart";

export default function SuccessfulPay(props) {
    const params = new URLSearchParams(window.location.search);
    const result = getEntries(params.entries());
    const { auth } = useAuth();
    const { cleanCart } = useCart();

    const {
        collection_id,
        collection_status,
        payment_id,
        status,
        external_reference,
        payment_type,
        merchant_order_id,
        preference_id,
        processing_mode } = result || null;

    useEffect(async () => {
        cleanCart();
    }, []);

    return (
        <BasicLayout>
            <h1>Mercado Pago</h1>
            <div>
                <ul>
                    <li>Collection ID: { collection_id }</li>
                    <li>Collection Status: { collection_status }</li>
                    <li>Payment ID: { payment_id }</li>
                    <li>Status: { status }</li>
                    <li>External Reference: { external_reference }</li>
                    <li>Payment Type: { payment_type }</li>
                    <li>Merchant Order Id: { merchant_order_id }</li>
                    <li>Preference ID: { preference_id }</li>
                    <li>Processing Mode: { processing_mode }</li>
                </ul>
            </div>
        </BasicLayout>
    )
}