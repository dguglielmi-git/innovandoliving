import React from "react";
import { Image } from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import { PATH_FAILURE_IMG } from "../../../utils/constants";

export default function FailurePayment(props) {
    const { t } = useTranslation();

    return (
        <div className="failurepayment">
            <div className="title">
                <h3>{ t('cartFailurePaymentTitle') }</h3>
            </div>
            <div className="image">
                <Image src={ `./${PATH_FAILURE_IMG}` } alt="" />
            </div>
            <div className="message">
                <p>{ t('cartFailurePaymentMsgFirstLine') }</p>
            </div>
            <div className="footer">
                <p><strong>{ t('businessName') } 💕 </strong></p>
            </div>
        </div>
    )
}