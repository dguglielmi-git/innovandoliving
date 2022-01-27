import React from "react";
import { STEP_CASH_AND_CARD } from "../../../utils/constants";
import CashAndCard from "../CashAndCard/CashAndCard";

export default function PayOrderCashAndCard(props) {

    const {
        step,
        setStep,
        totalPrice,
        setTotalCash
    } = props;

    if (step === STEP_CASH_AND_CARD) {
        return (
            <CashAndCard
                setStep={ setStep }
                totalAmount={ totalPrice }
                setTotalCash={ setTotalCash }
            />
        )
    }
    return <div />
}