import React from "react";
import { useTranslation } from "react-i18next";
import { STEP_CONFIRM_ORDER } from "../../../utils/constants";
import ConfirmCart from "../ConfirmCart";

export default function ConfirmOrder(props) {
    const {
        step,
        setStep,
        productsData,
        deliveryOption,
        shippingPrice,
        setShippingPrice
    } = props;
    const { t } = useTranslation();

    if (step === STEP_CONFIRM_ORDER) {
        return (<ConfirmCart
            t={ t }
            setStep={ setStep }
            products={ productsData }
            deliveryOption={ deliveryOption }
            shippingPrice={ shippingPrice }
            setShippingPrice={ setShippingPrice }
        />)
    }

    return <div />

}