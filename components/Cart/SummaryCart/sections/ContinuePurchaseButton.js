import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Icon } from "semantic-ui-react";
import { STEP_DELIVERY_OPTIONS } from "../../../../utils/constants";

export default function ContinuePurchaseButton(props) {

    const { setStep } = props;
    const { t } = useTranslation();

    return (
        <div className="button-box">
            <Button
                className="button-box__continue"
                onClick={ () => setStep(STEP_DELIVERY_OPTIONS) }>
                { t('cartSummaryCartContinuePurchase') }
                <Icon name="arrow right" />
            </Button>
        </div>
    )
}