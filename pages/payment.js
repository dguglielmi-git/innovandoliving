import React, { useEffect, useContext } from 'react';
import { useRouter } from "next/router";
import { useTranslation } from 'react-i18next';
import { LivingContext } from '../context/LivingContext';
import { saveOrder, sendProductsToMercadoPago } from "../api/mercadopago";
import {
    DELIVERY_OPTION_DELIVERY,
    PATH_DELIVERY_IMG,
    PAYMENT_METHOD_CASH,
    PAYMENT_METHOD_CASH_AND_CARD,
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
            if (deliveryOption === DELIVERY_OPTION_DELIVERY) {
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

    const getTotalCashAndCard = () => {
        const total = ((parseFloat(purchaseTotal) + parseFloat(shippingPrice)) - parseFloat(totalCash));
        return [{
            title: "Total Purchase",
            unit_price: total,
            quantity: 1,
            image: null,
        }];
    }

    const getItemsDependingOnPaymentMethod = () =>
        (paymentMethod === PAYMENT_METHOD_CASH_AND_CARD)
            ? getTotalCashAndCard()
            : getItems();

    const getTotal = () => (parseFloat(purchaseTotal) + parseFloat(shippingPrice))

    const createOrderJson = async (mercadoPagoResponse) => ({
        addressDelivery: address,
        addressTransport: addressTransport,
        addressInvoice: addressInvoice,
        costDelivery: shippingPrice,
        deliveryOption: deliveryOption,
        paymentMethodSelected: paymentMethod,
        purchasePendingPayment: totalCash,
        items: getItems(),
        purchaseTotalAmount: getTotal(),
        dateCreated: mercadoPagoResponse.date_created,
        orderCollectorId: mercadoPagoResponse.collector_id,
        paymentId: mercadoPagoResponse.id,
        mercadoPagoStatus: null,
        mercadoPagoPaymentId: null,
        mercadoPagoPaymetType: null,
        mercadoPagoMerchantOrderId: null,
        mercadoPagoProcessingMode: null,
    })

    const urlPayCash = (merchant, method) =>
        `/successfulPay/?merchant_order_id=${merchant}&payment_method=${method}`;

    useEffect(() => {
        (async () => {

            const res = await sendProductsToMercadoPago(getItemsDependingOnPaymentMethod())
            const response = await res.response;
            const order = await createOrderJson(response);
            const orderRes = await saveOrder(order);

            if (paymentMethod === PAYMENT_METHOD_CASH) {
                router.push(urlPayCash(orderRes.mercadoPagoMerchantOrderId, PAYMENT_METHOD_CASH));
            }
            else {
                router.push(response.init_point)
            }
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