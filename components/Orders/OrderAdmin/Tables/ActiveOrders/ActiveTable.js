import React from "react";
import ActiveHeaders from "./ActiveHeaders";
import ActiveBody from "./ActiveBody";

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