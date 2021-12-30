import React from "react";
import { Button, Icon } from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import { STEP_PAY_ORDER } from "../../../../utils/constants";

export default function ButtonContinue(props) {
    const { setStep } = props;
    const { t } = useTranslation();

    const processPayment = () => {
        setStep(STEP_PAY_ORDER);
    }

    return (
        <div className="button-submit">
            <Button className="submit" onClick={ () => processPayment() }>
                { t('confirmCartDetailContinueButton') }
                <Icon name="arrow right" />
            </Button>
        </div>
    )
}