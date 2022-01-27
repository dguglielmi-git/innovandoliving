import React, { useState, useEffect } from 'react';
import { size } from "lodash";
import { Icon } from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import useAuth from "../hooks/useAuth";
import BasicLayout from "../layouts/BasicLayout";
import StepsPurchase from "../components/Cart/StepsPurchase";
import {
    STEP_VERIFY_PRODUCTS,
    STEP_DELIVERY_OPTIONS,
    STEP_CONFIRM_ORDER,
    STEP_PAY_ORDER,
    PAYMENT_METHOD_CASH,
} from "../utils/constants";
import { getCart } from "../api/cart";
import { useRouter } from 'next/router';
import "../locales/i18n";
import VerifyProducts from '../components/Cart/Steps/VerifyProducts';
import ShowDeliveryOptions from '../components/Cart/Steps/ShowDeliveryOptions';
import ConfirmOrder from '../components/Cart/Steps/ConfirmOrder';
import PayOrder from '../components/Cart/Steps/PayOrder';
import PayOrderCashAndCard from '../components/Cart/Steps/PayOrderCashAndCard';
import FinishOrder from '../components/Cart/Steps/FinishOrder';

export default function Cart() {
    const router = useRouter();
    const { auth } = useAuth();
    const { t } = useTranslation();
    const [step, setStep] = useState(0);
    const [idUser, setIdUser] = useState(null);
    const [address, setAddress] = useState(null);
    const [totalCash, setTotalCash] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [shippingPrice, setShippingPrice] = useState(0)
    const [reloadCart, setReloadCart] = useState(false);
    const [productsData, setProductsData] = useState(null);
    const [paymentMethodSelected, setPaymentMethodSelected] = useState(PAYMENT_METHOD_CASH);
    const [deliveryOption, setDeliveryOption] = useState('store');

    useEffect(() => {
        if (!auth) {
            setIdUser(null)
            router.push("/");
        } else {
            setIdUser(auth.idUser)
        }
    }, [auth])

    useEffect(() => {
        (async () => {
            if (idUser) {
                const _cart = await getCart(idUser);
                if (_cart) {
                    setProductsData(_cart);
                }
            }
        })();
        setReloadCart(false);
    }, [reloadCart, idUser]);

    useEffect(() => {
        /**
         * Set the shipping price inside this useEffect to calculate the cost
         * depends upon the price per km and the distance given in the order
         * for getting the total price.
         */
    }, [address]);

    const ButtonBack = ({ stepLabel, buttonLabel }) => (
        <div className="button-back" onClick={ () => setStep(stepLabel) }>
            <Icon name='arrow alternate circle left' color="blue" size='big' />
            <h6>{ buttonLabel }</h6>
        </div>
    );

    if (!auth) return (<BasicLayout />)

    return (
        <BasicLayout className="cart">
            { step === STEP_DELIVERY_OPTIONS && <ButtonBack
                stepLabel={ STEP_VERIFY_PRODUCTS }
                buttonLabel={ t('cartAddressShippingBackToCart') } /> }
            { step === STEP_PAY_ORDER && <ButtonBack
                stepLabel={ STEP_CONFIRM_ORDER }
                buttonLabel={ t('cartAddressShippingPreviousStep') } /> }
            { size(productsData) > 0 && <StepsPurchase activeIndex={ step } /> }

            <VerifyProducts
                productsData={ productsData }
                reloadCart={ reloadCart }
                setReloadCart={ setReloadCart }
                step={ step }
                setStep={ setStep }
                totalPrice={ totalPrice }
                setTotalPrice={ setTotalPrice }
            />

            <ShowDeliveryOptions
                address={ address }
                setAddress={ setAddress }
                step={ step }
                setStep={ setStep }
                deliveryOption={ deliveryOption }
                setDeliveryOption={ setDeliveryOption }
            />

            <ConfirmOrder
                step={ step }
                setStep={ setStep }
                productsData={ productsData }
                deliveryOption={ deliveryOption }
                shippingPrice={ shippingPrice }
                setShippingPrice={ setShippingPrice }
            />

            <PayOrder
                step={ step }
                setStep={ setStep }
                paymentMethodSelected={ paymentMethodSelected }
                setPaymentMethodSelected={ setPaymentMethodSelected }
                totalPrice={ totalPrice }
                setTotalCash={ setTotalCash }
            />

            <PayOrderCashAndCard
                step={ step }
                setStep={ setStep }
                totalPrice={ totalPrice }
                setTotalCash={ setTotalCash }
            />

            <FinishOrder
                step={ step }
                address={ address }
                productsData={ productsData }
                deliveryOption={ deliveryOption }
                shippingPrice={ shippingPrice }
                paymentMethodSelected={ paymentMethodSelected }
                totalPrice={ totalPrice }
                totalCash={ totalCash }
            />

        </BasicLayout>
    )
}

