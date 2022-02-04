import React, { useState, useEffect } from 'react';
import { forEach, size } from "lodash";
import useCart from "../../../hooks/useCart";
import SubtitleSummaryCart from "./sections/SubtitleSummaryCart"
import ProductsListOnCart from "./sections/ProductsListOnCart";
import TotalPriceOfProductsList from './sections/TotalPriceOfProductsList';
import ContinuePurchaseButton from './sections/ContinuePurchaseButton';

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
                price += product.producto.price * product.quantity;
            });
        })()
        setTotalPrice(price);
        setReloadCart(false);
    }, [products, reloadCart]);

    return (
        <div className="summary-cart">
            <SubtitleSummaryCart />
            <ProductsListOnCart
                loading={ loading }
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
