import React, { useState, useEffect } from 'react';
import { size } from "lodash";
import { Icon } from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import useAuth from "../hooks/useAuth";
import BasicLayout from "../layouts/BasicLayout";
import SummaryCart from "../components/Cart/SummaryCart"
import StepsPurchase from "../components/Cart/StepsPurchase";
import AddressShipping from "../components/Cart/AddressShipping";
import ConfirmCart from "../components/Cart/ConfirmCart";
import { getCart } from "../api/cart";
import "../locales/i18n";

export default function Cart() {
    const { t } = useTranslation();
    const [step, setStep] = useState(0);
    const [productsData, setProductsData] = useState(null);
    const [reloadCart, setReloadCart] = useState(false);
    const [address, setAddress] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const { auth } = useAuth();
    const { idUser } = auth;

    useEffect(() => {
        (async () => {
            const _cart = await getCart(idUser);
            if (_cart) {
                setProductsData(_cart);
            }
        })();
        setReloadCart(false);
    }, [reloadCart]);

    const ButtonBack = () => (
        <div className="button-back" onClick={() => setStep(0)}>
            <Icon name='arrow alternate circle left' color="blue" size='big' />
            <h6>{t('cartAddressShippingBackToCart')}</h6>
        </div>
    );


    return (
        <BasicLayout className="cart">
            {step === 1 && <ButtonBack />}
            {size(productsData) > 0 && <StepsPurchase activeIndex={step} />}
            {step === 0 && (
                <SummaryCart
                    t={t}
                    products={productsData}
                    reloadCart={reloadCart}
                    setReloadCart={setReloadCart}
                    setStep={setStep}
                    totalPrice={totalPrice}
                    setTotalPrice={setTotalPrice}
                />
            )}
            {step === 1 && (<AddressShipping
                address={address}
                setAddress={setAddress}
                setStep={setStep}
            />)}
            {step === 2 && (<ConfirmCart
                t={t}
                setStep={setStep}
                products={productsData}
            />)}
            {step===3 && (<div>Payment</div>)}
        </BasicLayout>
    )
}

