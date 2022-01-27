import React from "react";
import FormPaymentMethod from "./sections/FormPaymentMethods";
import SubmitButton from "./sections/SubmitButton";

export default function PaymentMethod(props) {
    const {
        setStep,
        paymentMethodSelected,
        setPaymentMethodSelected,
        totalAmount,
        setTotalCash
    } = props;

    return (
        <div className="payment-method">
            <FormPaymentMethod
                paymentMethodSelected={ paymentMethodSelected }
                setPaymentMethodSelected={ setPaymentMethodSelected }
            />
            <SubmitButton
                setStep={ setStep }
                paymentMethodSelected={ paymentMethodSelected }
                totalAmount={ totalAmount }
                setTotalCash={ setTotalCash }
            />
        </div>
    )
}