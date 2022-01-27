import React, { useState, useEffect } from 'react';
import { size } from "lodash";
import { Icon } from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import useAuth from "../hooks/useAuth";
import BasicLayout from "../layouts/BasicLayout";
import SummaryCart from "../components/Cart/SummaryCart"
import Payment from "./payment";
import StepsPurchase from "../components/Cart/StepsPurchase";
import AddressShipping from "../components/Cart/AddressShipping";
import PaymentMethod from '../components/Cart/PaymentMethod/PaymentMethod';
import CashAndCard from '../components/Cart/CashAndCard/CashAndCard';
import ConfirmCart from "../components/Cart/ConfirmCart";
import {
    STEP_VERIFY_PRODUCTS,
    STEP_DELIVERY_OPTIONS,
    STEP_CONFIRM_ORDER,
    STEP_PAY_ORDER,
    STEP_FINISH_ORDER,
    PAYMENT_METHOD_CASH,
    STEP_CASH_AND_CARD
} from "../utils/constants";
import { getCart } from "../api/cart";
import { useRouter } from 'next/router';
import "../locales/i18n";

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
    }, [AddressShipping]);

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

            { step === STEP_VERIFY_PRODUCTS && (
                <SummaryCart
                    products={ productsData }
                    reloadCart={ reloadCart }
                    setReloadCart={ setReloadCart }
                    setStep={ setStep }
                    totalPrice={ totalPrice }
                    setTotalPrice={ setTotalPrice }
                />
            ) }

            { step === STEP_DELIVERY_OPTIONS && (<AddressShipping
                address={ address }
                setAddress={ setAddress }
                setStep={ setStep }
                deliveryOption={ deliveryOption }
                setDeliveryOption={ setDeliveryOption }
            />) }

            { step === STEP_CONFIRM_ORDER && (<ConfirmCart
                t={ t }
                setStep={ setStep }
                products={ productsData }
                deliveryOption={ deliveryOption }
                shippingPrice={ shippingPrice }
                setShippingPrice={ setShippingPrice }
            />) }

            { step === STEP_PAY_ORDER && (<PaymentMethod
                setStep={ setStep }
                paymentMethodSelected={ paymentMethodSelected }
                setPaymentMethodSelected={ setPaymentMethodSelected }
                totalAmount={ totalPrice }
                setTotalCash={ setTotalCash }
            />) }

            { step === STEP_CASH_AND_CARD && (
                <CashAndCard
                    setStep={ setStep }
                    totalAmount={ totalPrice }
                    setTotalCash={ setTotalCash }
                />
            ) }

            { step === STEP_FINISH_ORDER && (<Payment
                address={ address }
                products={ productsData }
                deliveryOption={ deliveryOption }
                shippingPrice={ shippingPrice }
                paymentMethod={ paymentMethodSelected }
                purchaseTotal={ totalPrice }
                totalCash={ totalCash }
            />) }
        </BasicLayout>
    )
}

