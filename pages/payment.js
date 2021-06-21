import React from 'react';
import { getEntries } from "../utils/util";

export default function Payment(props) {
    const params = URLSearchParams(window.location.search);
    const result = getEntries(params.entries());

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

    return (
        <div>
            <h1>Mercado Pago</h1>
            <div>
                <ul>
                    <li>Collection ID: {collection_id}</li>
                    <li>Collection Status: {collection_status}</li>
                    <li>Payment ID: {payment_id}</li>
                    <li>Status: {status}</li>
                    <li>External Reference: {external_reference}</li>
                    <li>Payment Type: {payment_type}</li>
                    <li>Merchant Order Id: {merchant_order_id}</li>
                    <li>Preference ID: {preference_id}</li>
                    <li>Processing Mode: {processing_mode}</li>
                </ul>
            </div>
        </div>
    )
}