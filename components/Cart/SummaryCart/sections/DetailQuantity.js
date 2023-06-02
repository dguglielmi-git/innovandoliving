import React from "react";

export default function DetailQuantity(props) {
    const { t, quantity } = props;

    return (
        <div className="product-description">
            { t('cartSummaryCartQuantity') } { ` ` } { quantity }
        </div>
    )
}