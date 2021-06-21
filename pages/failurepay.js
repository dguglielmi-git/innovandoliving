import React from 'react';
import { getEntries } from "../utils/util";

export default function FailurePay(props) {
    const params = URLSearchParams(window.location.search);
    const result = getEntries(params.entries());

    return (
        <div>
            failure
        </div>
    )
}