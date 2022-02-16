import React, { useState, useEffect } from 'react';
import { forEach, size } from "lodash";
import useCart from "../../../hooks/useCart";
import SubtitleSummaryCart from "./sections/SubtitleSummaryCart"
import ProductsListOnCart from "./sections/ProductsListOnCart";
import TotalPriceOfProductsList from './sections/TotalPriceOfProductsList';
import ContinuePurchaseButton from './sections/ContinuePurchaseButton';
import { getDiscountPrice } from '../../../utils/util';

export default function SummaryCart(props) {
    const {
        products,
        reloadCart,
        setReloadCart,
        setStep,
        totalPrice,
        setTotalPrice
    } = props;
    const [loading, setLoading] = useState(true);
    const { removeProductCart } = useCart();

    useEffect(() => {
        if (size(products) >= 0) setLoading(false)
        let price = 0;
        (async () => {
            await forEach(products, (product) => {
                if (product.producto.discount) {
                    price += (parseFloat(getDiscountPrice(product.producto.price, product.producto.discount)) * parseFloat(product.quantity));
                } else {
                    price += (parseFloat(product.producto.price) * parseFloat(product.quantity));
                }
            });
        })()
        setTotalPrice(price);
        setReloadCart(false);
    }, [products, reloadCart]);

    return (
        <div className="summary-cart">
            <SubtitleSummaryCart />
            <ProductsListOnCart
                products={ products }
                setReloadCart={ setReloadCart }
                removeProductCart={ removeProductCart }
            />
            <TotalPriceOfProductsList totalPrice={ totalPrice }
            />
            { size(products) > 0 && (
                <ContinuePurchaseButton setStep={ setStep } />
            ) }
        </div>
    )
}
