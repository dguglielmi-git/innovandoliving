import React from "react";
import { STEP_PAY_ORDER } from "../../../utils/constants";
import PaymentMethod from "../PaymentMethod/PaymentMethod";

export default function PayOrder(props) {
    const {
        step,
        setStep,
        paymentMethodSelected,
        setPaymentMethodSelected,
        totalPrice,
        setTotalCash
    } = props;

    if (step === STEP_PAY_ORDER) {
        return (<PaymentMethod
            setStep={ setStep }
            paymentMethodSelected={ paymentMethodSelected }
            setPaymentMethodSelected={ setPaymentMethodSelected }
            totalAmount={ totalPrice }
            setTotalCash={ setTotalCash }
        />)
    }

    return <div />

}
