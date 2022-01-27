import React, { useEffect } from "react";
import { Image } from "semantic-ui-react";
import useCart from "../../../hooks/useCart";
import { useTranslation } from "react-i18next";
import { orderUpdate } from "../../../api/mercadopago";
import { parseFinalOrder } from "../../../utils/mercadopago";
import { PATH_SUCCESS_IMG } from "../../../utils/constants";

export default function SuccessfulPayment(props) {
    const { incomingData, paymentMethod } = props;
    const { cleanCart } = useCart();
    const { t } = useTranslation();
    const { merchant_order_id } = incomingData || null;

    useEffect(() => {
        (async () => {
            if (!paymentMethod) {
                const finalOrder = await parseFinalOrder(incomingData);
                const res = await orderUpdate(finalOrder);
            }
            cleanCart();
        })()
    }, []);

    return (
        <div className="successfulpay">
            <div className="title">
                <h3>{ t('cartSuccessfulPaymentTitle') }</h3>
            </div>
            <div className="image">
                <Image src={ `./${PATH_SUCCESS_IMG}` } alt="" />
            </div>
            <div className="order-success">
                <h4>{ t('cartSuccessfulPaymentOrderNumber') + merchant_order_id }.</h4>
            </div>
            <div className="message">
                <p>{ t('cartSuccessfulPaymentMsgFirstLine') }</p>
                <p>{ t('cartSuccessfulPaymentMsgSecondLine') } </p>
            </div>
            <div className="footer">
                <p>{ t('cartSuccessfulPaymentFooterThanks') } 😃  </p>
                <p><strong>{ t('businessName') } 💕 </strong></p>
            </div>
        </div>
    )
}