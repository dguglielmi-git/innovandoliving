import React from "react";

export default function DetailTitle(props) {
    const { title } = props
    return (
        <div className="product-name">{ title }</div>
    )
}