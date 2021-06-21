import React, { useMemo, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import jwtDecode from "jwt-decode";
import { useRouter } from "next/router";
import AuthContext from "../context/AuthContext";
import CartContext from "../context/CartContext";
import { setToken, getToken, removeToken } from "../api/token"
import {
  getCart,
  getProductsCart,
  addToCart,
  addProductCart,
  countProductsCart,
  removeProductCart,
  removeItemCart,
  removeAllProductsCart,
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

PrimeReact.ripple = true;

export default function MyApp({ Component, pageProps }) {
  const { t } = useTranslation();
  const [auth, setAuth] = useState(undefined);
  const [reloadUser, setReloadUser] = useState(false);
  const [totalProductsCart, setTotalProductsCart] = useState(0);
  const [reloadCart, setReloadCart] = useState(false);
  const router = useRouter();
  library.add(fab, faCheckSquare, faCoffee);

  useEffect(() => {
    const token = getToken();
    if (token) {
      setAuth({
        token,
        idUser: jwtDecode(token).id
      });
    } else {
      setAuth(null);
    }
    setReloadUser(false);
  }, [reloadUser]);

  useEffect(() => {
    if (auth) {
      setTotalProductsCart(countProductsCart(auth.idUser));
    }
    setReloadCart(false);
  }, [reloadCart, auth]);

  const login = (token) => {
    setToken(token);
    setAuth({
      token,
      idUser: jwtDecode(token).id
    })
  }

  const logout = () => {
    if (auth) {
      removeToken();
      setAuth(null);
      router.push("/");
    }
  }

  const addProduct = (idUser, product, quantity) => {
    const token = getToken();
    if (token) {
      addToCart(idUser, product, quantity, logout);
      setReloadCart(true);
    } else {
      toast.warning(t('appAddProduct'));
    }
  }

  const removeProduct = (product) => {
    removeItemCart(product, logout);
    setReloadCart(true);
  }

  // From this object we call to every system's functions (login, logout, etc)
  // We utilize setReloadUser to reload information from users after modifications.
  const authData = useMemo(
    () => ({
      auth,
      login,
      logout,
      setReloadUser,
    }),
    [auth]
  );

  const cartData = useMemo(
    () => ({
      productsCart: totalProductsCart,
      addProductCart: (idUser, product, quantity) => addProduct(idUser, product, quantity),
      getProductsCart: getCart,
      removeProductCart: (product) => removeProduct(product),
      removeAllProductsCart: removeAllProductsCart,
    }),
    [totalProductsCart]
  );

  if (auth === undefined) return null;

  return <AuthContext.Provider value={authData}>
    <CartContext.Provider value={cartData}>
      <Component {...pageProps} />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
      />
    </CartContext.Provider>
  </AuthContext.Provider>
}

