import React from "react"
import { Loader } from "semantic-ui-react";

export default function BasicLoading(props) {

    const { label } = props;

    return (
        <Loader active>
            { label }
        </Loader>
    )
}