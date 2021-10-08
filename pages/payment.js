import React, { useEffect } from 'react';
import { useRouter } from "next/router";

export default function Payment(props) {
    const { address, products, deliveryOption, shippingPrice } = props;
    const router = useRouter();

    const createOrderJson = (paymentDetails) => ({
        orderPreferenceId: paymentDetails.id,
        orderCollectorId: paymentDetails.collector_id,
        dateCreated: paymentDetails.date_created,
        deliveryOption: deliveryOption,
        addressDelivery: address,
        costDelivery: shippingPrice,
        items: products
    })

    const sendProductsToMercadoPago = async () => {
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

        const url = "http://localhost:5000/api/mercadopago/payment"
        const result = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ "items": items })
        })
        const response = await result.json()
        return response
    }

    useEffect(() => {
        (async () => {
            const res = await sendProductsToMercadoPago()
            const response = await res.response;
            console.log(createOrderJson(response))
            router.push(response.init_point)
            console.log(response)
        })()
    }, [])

    return (
        <div>
            <div className="ui active inverted dimmer">
                <div className="ui large text loader">Procesando Compra...</div>
            </div>
        </div>
    )
}