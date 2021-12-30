import React from 'react';
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import FormPayment from "./FormPayment";
import { useTranslation } from "react-i18next";
import "../../../locales/i18n";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_TOKEN);

export default function Payment(props) {
    const { products, address } = props;
    const { t } = useTranslation();

    return (
        <div className="payment">
            <div className="title">{ t('cartPaymentTitlePay') }</div>
            <div className="data">
                <Elements stripe={ stripePromise }>
                    <FormPayment products={ products } address={ address } />
                </Elements>
            </div>
        </div>
    )
}
