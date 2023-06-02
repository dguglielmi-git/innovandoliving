import React from "react";
import ClosedBody from "./ClosedBody";
import ClosedHeaders from "./ClosedHeaders";

export default function ClosedTable(props) {
    const { orders, openDetails } = props;

    return (
        <>
            <ClosedHeaders />
            <ClosedBody orders={ orders } openDetails={ openDetails } />
        </>
    )
}