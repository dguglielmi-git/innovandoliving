import React from "react";
import { useTranslation } from "react-i18next";
import {
    STEP_CASH_AND_CARD,
    STEP_CONFIRM_ORDER,
    STEP_DELIVERY_OPTIONS,
    STEP_PAY_ORDER,
    STEP_VERIFY_PRODUCTS
} from "../../../utils/constants";
import ButtonBack from "./ButtonBack";

export default function ShowButtonBack(props) {
    const { step, setStep } = props;
    const { t } = useTranslation();

    let label = '';
    let buttonLabel = '';
    switch (step) {
        case STEP_DELIVERY_OPTIONS:
            label = STEP_VERIFY_PRODUCTS;
            buttonLabel = t('cartAddressShippingBackToCart');
            break;
        case STEP_PAY_ORDER:
            label = STEP_CONFIRM_ORDER;
            buttonLabel = t('cartAddressShippingPreviousStep');
            break;
        case STEP_CASH_AND_CARD:
            label = STEP_PAY_ORDER;
            buttonLabel = "Go back to Previous Step"
            break;
        default:
            return <div />;
    }

    return (
        <ButtonBack
            setStep={ setStep }
            stepLabel={ label }
            buttonLabel={ buttonLabel } />
    )
}