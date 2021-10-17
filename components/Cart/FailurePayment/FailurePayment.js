import React, { useEffect } from "react";
import { Image } from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import { orderUpdate } from "../../../api/mercadopago";
import { parseFinalOrder } from "../../../utils/mercadopago";

export default function FailurePayment(props) {
    const { t } = useTranslation();

    return (
        <div className="failurepayment">
            <div className="title">
                <h3>{ t('cartFailurePaymentTitle') }</h3>
            </div>
            <div className="image">
                <Image src="./failure.png" alt="" />
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