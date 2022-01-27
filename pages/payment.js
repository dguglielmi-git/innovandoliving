import React, { useEffect, useContext } from 'react';
import { useRouter } from "next/router";
import { useTranslation } from 'react-i18next';
import { LivingContext } from '../context/LivingContext';
import { saveOrder, sendProductsToMercadoPago } from "../api/mercadopago";
import {
    PATH_DELIVERY_IMG,
    PAYMENT_METHOD_CASH,
    PAYMENT_METHOD_CASH_AND_CARD
} from '../utils/constants';

export default function Payment(props) {
    const {
        address,
        products,
        deliveryOption,
        shippingPrice,
        paymentMethod,
        purchaseTotal,
        totalCash
    } = props;
    const router = useRouter();
    const { t } = useTranslation();
    const { addressInvoice, addressTransport } = useContext(LivingContext);

    const getItems = () => {
        const items = []
        if (products) {
            products.map(item => {
                items.push({
                    title: item.producto.title,
                    unit_price: item.producto.price,
                    quantity: item.quantity,
                    image: item.producto.poster.url,
                })
            })
            if ((deliveryOption !== 'store') || (deliveryOption !== 'tbd')) {
                items.push({
                    title: t('labelShipping'),
                    unit_price: shippingPrice,
                    quantity: 1,
                    image: `/${PATH_DELIVERY_IMG}`,
                })
            }
        }
        return items;
    }

    const getPurchaseTotalAmount = () =>
        (paymentMethod === PAYMENT_METHOD_CASH_AND_CARD)
            ? (parseFloat(purchaseTotal) - parseFloat(totalCash))
            : (parseFloat(purchaseTotal))

    const createOrderJson = async (mercadoPagoResponse) => ({
        addressDelivery: address,
        addressTransport: addressTransport,
        addressInvoice: addressInvoice,
        costDelivery: shippingPrice,
        deliveryOption: deliveryOption,
        paymentMethodSelected: paymentMethod,
        purchasePendingPayment: totalCash,
        items: getItems(),
        purchaseTotalAmount: await getPurchaseTotalAmount(),
        dateCreated: mercadoPagoResponse.date_created,
        orderCollectorId: mercadoPagoResponse.collector_id,
        paymentId: mercadoPagoResponse.id,
        mercadoPagoStatus: null,
        mercadoPagoPaymentId: null,
        mercadoPagoPaymetType: null,
        mercadoPagoMerchantOrderId: null,
        mercadoPagoProcessingMode: null,
    })

    useEffect(() => {
        (async () => {
            const res = await sendProductsToMercadoPago(getItems())
            const response = await res.response;
            const order = await createOrderJson(response)
            const orderRes = await saveOrder(order);

            if (paymentMethod === PAYMENT_METHOD_CASH) {
                router.push(`/successfulPay/?merchant_order_id=${orderRes.mercadoPagoMerchantOrderId}&payment_method=${PAYMENT_METHOD_CASH}`);
            }
            if (paymentMethod !== PAYMENT_METHOD_CASH)
                router.push(response.init_point)
        })()
    }, []);

    return (
        <div>
            <div className="ui active inverted dimmer">
                <div className="ui large text loader">
                    { t('paymentProcessing') }
                </div>
            </div>
        </div>
    )
}