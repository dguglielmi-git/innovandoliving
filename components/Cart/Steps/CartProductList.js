import React from "react";
import { STEP_VERIFY_PRODUCTS } from "../../../utils/constants";
import SummaryCart from "../SummaryCart";

export default function CartProductList(props) {
    const {
        productsData,
        reloadCart,
        setReloadCart,
        step,
        setStep,
        totalPrice,
        setTotalPrice
    } = props;

    if (step === STEP_VERIFY_PRODUCTS) {
        return <SummaryCart
            products={ productsData }
            reloadCart={ reloadCart }
            setReloadCart={ setReloadCart }
            setStep={ setStep }
            totalPrice={ totalPrice }
            setTotalPrice={ setTotalPrice }
        />
    }

    return <div />

}