import React from "react";
import { getEntries } from "../utils/util";

export default function PendingPay(props) {
    const params = URLSearchParams(window.location.params);
    const result = getEntries(params.entries());
    
    return (
        <div>
            <h1>Pending Payment</h1>
        </div>
    )
}