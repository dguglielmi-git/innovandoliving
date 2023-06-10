import React, { useState, useEffect } from 'react';
import useAuth from "../hooks/useAuth";
import BasicLayout from "../layouts/BasicLayout";
import {
    PAYMENT_METHOD_CASH,
    DELIVERY_OPTION_STORE,
} from "../utils/constants";
import { getCart } from "../api/cart";
import { useRouter } from 'next/router';
import PayOrder from '../components/Cart/Steps/PayOrder';
import FinishOrder from '../components/Cart/Steps/FinishOrder';
import ConfirmOrder from '../components/Cart/Steps/ConfirmOrder';
import VerifyProducts from '../components/Cart/Steps/VerifyProducts';
import ShowButtonBack from '../components/Cart/sections/ShowButtonBack';
import ShowStepsPurchase from '../components/Cart/sections/ShowStepsPurchase';
import ShowDeliveryOptions from '../components/Cart/Steps/ShowDeliveryOptions';
import PayOrderCashAndCard from '../components/Cart/Steps/PayOrderCashAndCard';

export default function Cart() {
    const router = useRouter();
    const { auth } = useAuth();
    const [step, setStep] = useState(0);
    const [idUser, setIdUser] = useState(null);
    const [address, setAddress] = useState(null);
    const [totalCash, setTotalCash] = useState(0);
    const [totalPrice, setTotalPrice] = useState(0);
    const [shippingPrice, setShippingPrice] = useState(0)
    const [reloadCart, setReloadCart] = useState(false);
    const [productsData, setProductsData] = useState(null);
    const [paymentMethodSelected, setPaymentMethodSelected] = useState(PAYMENT_METHOD_CASH);
    const [deliveryOption, setDeliveryOption] = useState(DELIVERY_OPTION_STORE);

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
                const _cart = await getCart();
                if (_cart) {
                    setProductsData(_cart);
                }
            }
        })();
        setReloadCart(false);
    }, [reloadCart, idUser]);

    if (!auth) return (<BasicLayout />)

    return (
        <BasicLayout className="cart">
            <ShowButtonBack step={ step } setStep={ setStep } />

            <ShowStepsPurchase productsData={ productsData } step={ step } />

            <VerifyProducts
                step={ step }
                setStep={ setStep }
                totalPrice={ totalPrice }
                reloadCart={ reloadCart }
                productsData={ productsData }
                setReloadCart={ setReloadCart }
                setTotalPrice={ setTotalPrice }
            />

            <ShowDeliveryOptions
                step={ step }
                setStep={ setStep }
                address={ address }
                setAddress={ setAddress }
                deliveryOption={ deliveryOption }
                setDeliveryOption={ setDeliveryOption }
            />

            <ConfirmOrder
                step={ step }
                setStep={ setStep }
                address={ address }
                productsData={ productsData }
                shippingPrice={ shippingPrice }
                deliveryOption={ deliveryOption }
                setShippingPrice={ setShippingPrice }
            />

            <PayOrder
                step={ step }
                setStep={ setStep }
                totalPrice={ totalPrice }
                setTotalCash={ setTotalCash }
                paymentMethodSelected={ paymentMethodSelected }
                setPaymentMethodSelected={ setPaymentMethodSelected }
            />

            <PayOrderCashAndCard
                step={ step }
                setStep={ setStep }
                totalPrice={ (parseFloat(totalPrice) + parseFloat(shippingPrice)) }
                setTotalCash={ setTotalCash }
            />

            <FinishOrder
                step={ step }
                address={ address }
                totalCash={ totalCash }
                totalPrice={ totalPrice }
                productsData={ productsData }
                shippingPrice={ shippingPrice }
                deliveryOption={ deliveryOption }
                paymentMethodSelected={ paymentMethodSelected }
            />
        </BasicLayout>
    )
}

