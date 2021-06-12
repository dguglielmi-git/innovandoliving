import React, { useState, useEffect } from 'react';
import BasicLayout from "../layouts/BasicLayout";
import useAuth from "../hooks/useAuth";
import useCart from "../hooks/useCart";
import Payment from "../components/Cart/Payment";
import SummaryCart from "../components/Cart/SummaryCart";
import AddressShipping from "../components/Cart/AddressShipping";
import { getProductoByUrlApi } from "../api/producto";
import { getCart } from "../api/cart";

export default function Cart() {
    const { getProductsCart } = useCart();
    const products = getProductsCart();

    return !products ? <EmtpyCart /> : <DataCart />;
}

function EmtpyCart() {
    return (
        <BasicLayout className="empty-cart">
            <h2>No hay productos en el carrito</h2>
        </BasicLayout>
    )
}

function DataCart(props) {
    const [step, setStep] = useState(0);
    const [productsData, setProductsData] = useState(null);
    const [reloadCart, setReloadCart] = useState(false);
    const [address, setAddress] = useState(null);
    const { auth, login} = useAuth();
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

    return (
        <BasicLayout className="empty-cart">
            {step === 0 && (
                <SummaryCart
                    products={productsData}
                    reloadCart={reloadCart}
                    setReloadCart={setReloadCart}
                    setStep={setStep}
                />)
            }
            {step === 1 && (<AddressShipping setAddress={setAddress} setStep={setStep} />)}
        </BasicLayout>
    )
}