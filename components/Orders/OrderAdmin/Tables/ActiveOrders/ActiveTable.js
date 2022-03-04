import React from "react";
import ActiveBody from "./ActiveBody";
import ActiveHeaders from "./ActiveHeaders";

export default function ActiveTable(props) {
    const { orders, openDetails, userType } = props;

    return (
        <>
            <ActiveHeaders />
            <ActiveBody
                orders={ orders }
                openDetails={ openDetails }
                userType={ userType }
            />
        </>
    )
}