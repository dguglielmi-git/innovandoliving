import React from "react";
import { numToDollar } from "../../../../utils/util";

export default function DetailUnitPrice(props) {
    const { t, unitPrice } = props;
    return (
        <div className="product-description">
            { t('cartSummaryCartUnitPrice') } { ` ` }
            { numToDollar(unitPrice) }
        </div>
    )
}