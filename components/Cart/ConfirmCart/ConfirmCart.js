import React, { useState, useEffect } from 'react';
import { forEach } from "lodash";
import { Divider } from 'primereact/divider';
import ButtonBack from './sections/ButtonBack';
import HeaderTotalCart from './sections/HeaderTotalCart';
import ListItemsCart from './sections/ListItemsCart';
import FooterTotalCart from './sections/FooterTotalCart';
import ButtonContinue from './sections/ButtonContinue';

export default function ConfirmCart(props) {
    const {
        t,
        setStep,
        products,
        deliveryOption,
        shippingPrice,
        setShippingPrice } = props;
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        /**
         * TO DO: shipping prices must be retrieved from database, instead of the following hardcoded values.
         */
        switch (deliveryOption) {
            case 'delivery':
                setShippingPrice(2100);
                break;
            case 'deliveryExternal':
                setShippingPrice(3200);
                break;
            default:
                setShippingPrice(0);
        }
    }, []);

    useEffect(() => {
        let price = 0;
        (async () => {
            await forEach(products, (product) => {
                price += product.producto.price * product.quantity;
            });
        })()
        setTotalPrice(price);
    }, [products]);

    return (
        <div className="confirm-cart">
            <ButtonBack setStep={ setStep } />

            <HeaderTotalCart />

            <ListItemsCart products={ products } />

            <FooterTotalCart
                t={ t }
                deliveryOption={ deliveryOption }
                totalPrice={ totalPrice }
                shippingPrice={ shippingPrice }
            />

            <Divider align="center" />

            <ButtonContinue setStep={ setStep } />
        </div>
    )
}