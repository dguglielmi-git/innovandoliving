import React from "react";
import { Icon } from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import { STEP_DELIVERY_OPTIONS } from "../../../../utils/constants";

export default function ButtonBack(props) {
    const { setStep } = props;
    const { t } = useTranslation();

    return (
        <div
            className="button-back"
            onClick={ () => setStep(STEP_DELIVERY_OPTIONS) }
        >
            <Icon
                name='arrow alternate circle left'
                color="blue"
                size='big' />
            <h6>{ t('confirmCartButtonBackLabel') }</h6>
        </div>
    )
}