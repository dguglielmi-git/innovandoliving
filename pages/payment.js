import React, { useEffect, useContext } from 'react';
import { useRouter } from "next/router";
import { useTranslation } from 'react-i18next';
import { LivingContext } from '../context/LivingContext';
import { saveOrder, sendProductsToMercadoPago } from "../api/mercadopago";

export default function Payment(props) {
    const { address, products, deliveryOption, shippingPrice } = props;
    const { addressInvoice, addressTransport } = useContext(LivingContext);
    const { t } = useTranslation();
    const router = useRouter();

    const getItems = () => {
        const items = []
        if (products) {
            products.map(item => {
                items.push({
                    title: item.producto.title,
                    unit_price: item.producto.price,
                    quantity: item.quantity
                })
            })
            if (deliveryOption !== 'store') {
                items.push({
                    title: "Envio",
                    unit_price: shippingPrice,
                    quantity: 1
                })
            }
        }
        return items;
    }

    const createOrderJson = async (mercadoPagoResponse) => ({
        addressDelivery: address,
        addressTransport: addressTransport,
        addressInvoice: addressInvoice,
        costDelivery: shippingPrice,
        deliveryOption: deliveryOption,
        items: getItems(),
        purchaseTotalAmount: getItems().reduce((sum, item) => sum + (item.quantity * item.unit_price), 0),
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
            router.push(response.init_point)
        })()
    }, []);

    return (
        <div>
            <div className="ui active inverted dimmer">
                <div className="ui large text loader">{ t('paymentProcessing') } </div>
            </div>
        </div>
    )
}