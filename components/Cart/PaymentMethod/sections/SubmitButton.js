import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Icon } from "semantic-ui-react";
import {
    PAYMENT_METHOD_CASH,
    PAYMENT_METHOD_CASH_AND_CARD,
    STEP_CASH_AND_CARD,
    STEP_FINISH_ORDER
} from "../../../../utils/constants";

export default function SubmitButton(props) {
    const { setStep, paymentMethodSelected, totalAmount, setTotalCash } = props;
    const { t } = useTranslation();

    const submit = () => {
        if (paymentMethodSelected === PAYMENT_METHOD_CASH_AND_CARD) {
            setStep(STEP_CASH_AND_CARD)
        } else {
            if (paymentMethodSelected === PAYMENT_METHOD_CASH) {
                setTotalCash(parseFloat(totalAmount));
            }
            setStep(STEP_FINISH_ORDER)
        }
    }

    return (
        <div className="payment-method__submit">
            <Button className="submit" onClick={ () => submit() }>
                { t('paymentMethodSubmitButtonLabel') }
                <Icon name="arrow right" />
            </Button>
        </div>
    )
}