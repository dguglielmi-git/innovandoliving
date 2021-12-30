import React, { useState } from 'react';
import { Button } from "semantic-ui-react";
import { useRouter } from "next/router";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { toast } from "react-toastify";
import { size } from "lodash";
import { useTranslation } from "react-i18next";
import useAuth from "../../../../hooks/useAuth";
import useCart from "../../../../hooks/useCart";
import { paymentCartApi } from "../../../../api/cart";
import "../../../../locales/i18n";

export default function FormPayment(props) {
    const { products, address } = props;
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);
    const stripe = useStripe();
    const elements = useElements();
    const { auth, logout } = useAuth();
    const router = useRouter();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        if (!stripe || !elements) {
            setLoading(false);
            return null;
        }

        const cardElement = elements.getElement(CardElement);
        const result = await stripe.createToken(cardElement);

        if (result.error) {
            toast.error(result.error.message);
        } else {
            const response = await paymentCartApi(
                result.token,
                products,
                auth.idUser,
                address,
                logout
            );

            if (size(response) > 0) {
                toast.success(t('cartPaymentFormPaymentOkDelivery'));
                router.push("/orders");
            } else {
                toast.error(t('cartPaymentFormPaymentErrorDelivery'));
            }
        }

        setLoading(false);
    }

    return (
        <form className="form-payment" onSubmit={ handleSubmit }>
            <CardElement />
            <Button type="submit" loading={ loading } disabled={ !stripe }>
                { t('cartPaymentFormPaymentButtonPay') }
            </Button>
        </form>
    )
}
