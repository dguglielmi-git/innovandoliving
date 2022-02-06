import React, { useMemo, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";
import AuthContext from "../context/AuthContext";
import CartContext from "../context/CartContext";
import MsgsContext from "../context/MsgsContext";
import SettingsContext from "../context/SettingsContext";
import MyLivingContext from "../context/LivingContext";
import { setToken, getToken, removeToken } from "../api/token"
import {
    getCart,
    cleanCart,
    addToCart,
    countProductsCart,
    removeItemCart,
} from "../api/cart";
import PrimeReact from 'primereact/api';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { faCheckSquare, faCoffee } from '@fortawesome/free-solid-svg-icons';
import { useTranslation } from "react-i18next";
import 'react-toastify/dist/ReactToastify.css';
import "../scss/global.scss";
import 'semantic-ui-css/semantic.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "../locales/i18n";
import { getConfigurations } from "../api/configurations";
import { getUnreadMsgs } from "../api/producto";

PrimeReact.ripple = true;

export default function MyApp({ Component, pageProps }) {
    const router = useRouter();
    const { t } = useTranslation();
    const [auth, setAuth] = useState(undefined);
    const [reloadUser, setReloadUser] = useState(false);
    const [reloadCart, setReloadCart] = useState(false);
    const [queryCounter, setQueryCounter] = useState(0);
    const [ordersCounter, setOrdersCounter] = useState(0);
    const [reloadMsgCounter, setReloadMsgCounter] = useState(false);
    const [configs, setConfigs] = useState(undefined);
    const [totalProductsCart, setTotalProductsCart] = useState(0);

    library.add(fab, faCheckSquare, faCoffee);

    useEffect(async () => {
        const token = getToken();
        if (token) {
            setAuth({
                token,
                idUser: jwtDecode(token).id
            });
        } else {
            setAuth(null);
        }
        const conf = await getConfigurations(logout);
        setConfigs(conf);
        setReloadUser(false);

    }, [reloadUser]);

    useEffect(() => {
        if (auth) {
            setTotalProductsCart(countProductsCart(auth.idUser));
        }
        setReloadCart(false);
    }, [reloadCart, auth]);

    useEffect(() => {
        const interval = setInterval(async () => {
            setReloadMsgCounter(true);
        }, 15000);
        return () => clearInterval(interval);
    }, []);

    useEffect(async () => {
        const counters = await getUnreadMsgs();
        const { queryCounter: qCounter, ordersCounter: oCounter } = counters;
        if (qCounter !== queryCounter) {
            setQueryCounter(qCounter);
        }
        if (oCounter !== ordersCounter) {
            setOrdersCounter(oCounter);
        }
        setReloadMsgCounter(false);
    }, [reloadMsgCounter]);

    const login = (token) => {
        setToken(token);
        setAuth({
            token,
            idUser: jwtDecode(token).id
        })
    }

    const logout = () => {
        if (auth) {
            router.push("/");
            removeToken();
            setAuth(null);
        }
    }

    const addProduct = async (idUser, product, quantity) => {
        const token = getToken();
        if (token) {
            await addToCart(idUser, product, quantity, logout);
            setReloadCart(true);
        } else {
            toast.warning(t('appAddProduct'));
        }
    }

    const removeProduct = (product) => {
        removeItemCart(product, logout);
        setReloadCart(true);
    }

    const cleaningCart = async (idUser, logout) => {
        await cleanCart(idUser, logout)
        setReloadCart(true);
    }

    const settingsData = useMemo(
        () => ({
            configs,
        }), [configs]
    );

    const authData = useMemo(
        () => ({
            auth,
            login,
            logout,
            setReloadUser,
        }),
        [auth]
    );

    const msgsData = useMemo(
        () => ({
            queryCounter: queryCounter,
            ordersCounter: ordersCounter,
            setReloadMsgCounter,
        }),
        [queryCounter, ordersCounter]
    );

    const cartData = useMemo(
        () => ({
            productsCart: totalProductsCart,
            addProductCart: (idUser, product, quantity) => addProduct(idUser, product, quantity),
            getProductsCart: getCart,
            removeProductCart: (product) => removeProduct(product),
            cleanCart: (idUser) => cleaningCart(idUser, logout)
        }),
        [totalProductsCart]
    );

    if (auth === undefined) return null;

    return (
        <MsgsContext.Provider value={ msgsData }>
            <SettingsContext.Provider value={ settingsData }>
                <AuthContext.Provider value={ authData }>
                    <CartContext.Provider value={ cartData }>
                        <MyLivingContext>
                            <Component { ...pageProps } />
                            <ToastContainer
                                position="top-right"
                                autoClose={ 5000 }
                                hideProgressBar
                                newestOnTop
                                closeOnClick
                                rtl={ false }
                                pauseOnFocusLoss={ false }
                                draggable
                                pauseOnHover
                            />
                        </MyLivingContext>
                    </CartContext.Provider>
                </AuthContext.Provider>
            </SettingsContext.Provider>
        </MsgsContext.Provider>
    )
}

