import React, { useEffect } from "react";
import useCart from "../../../hooks/useCart";
import { Image } from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import { orderUpdate } from "../../../api/mercadopago";
import { parseFinalOrder } from "../../../utils/mercadopago";

export default function PendingPayment(props) {
    const { incomingData } = props;
    const { cleanCart } = useCart();
    const { t } = useTranslation();
    const { merchant_order_id } = incomingData || null;

    useEffect(() => {
        (async () => {
            const finalOrder = await parseFinalOrder(incomingData);
            const res = await orderUpdate(finalOrder);
            cleanCart();
        })()
    }, []);

    return (
        <div className="pending-payment">
            <div className="title">
                <h3>{ t('cartPendingPaymentTitle') }</h3>
            </div>
            <div className="image">
                <Image src="./pending.png" alt="" />
            </div>
            <div className="order">
                <h4>{ t('cartPendingPaymentOrderNumber') + merchant_order_id }.</h4>
            </div>
            <div className="message">
                <p>{ t('cartPendingPaymentMsgFirstLine') }</p>
            </div>
            <div className="footer">
                <p><strong>{ t('businessName') } 💕 </strong></p>
            </div>
        </div>
    )
}