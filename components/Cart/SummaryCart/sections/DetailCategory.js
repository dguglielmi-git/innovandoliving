import React from "react";

export default function DetailCategory(props) {
    const { category } = props;
    return (
        <span className="product-category">{ category }</span>
    )
}