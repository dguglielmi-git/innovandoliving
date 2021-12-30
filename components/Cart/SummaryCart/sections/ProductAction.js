import React from "react";
import { Button } from 'primereact/button';
import { numToDollar } from "../../../../utils/util";

export default function ProductAction(props) {
    const { t, price, quantity, setShowDialog } = props;

    return (
        <div className="product-action">
            <span className="product-price">
                { numToDollar(price * quantity) }
            </span>
            <Button
                icon="pi pi-trash"
                label={ t('summaryDetailRemoveFromCart') }
                onClick={ () => setShowDialog(true) } />
        </div>
    )
}