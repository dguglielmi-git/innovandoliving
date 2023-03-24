import React from "react";
import { STEP_FINISH_ORDER } from "../../../utils/constants";
import Payment from "../../../pages/payment";

export default function FinishOrder(props) {
    const {
        step,
        address,
        productsData,
        deliveryOption,
        shippingPrice,
        paymentMethodSelected,
        totalPrice,
        totalCash
    } = props;

    if (step === STEP_FINISH_ORDER) {
        return (
            <Payment
                address={ address }
                products={ productsData }
                deliveryOption={ deliveryOption }
                shippingPrice={ shippingPrice }
                paymentMethod={ paymentMethodSelected }
                purchaseTotal={ totalPrice }
                totalCash={ totalCash }
            />
        )
    }

    return <div />

}