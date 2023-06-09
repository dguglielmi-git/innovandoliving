import { toast } from "react-toastify";
import { size, map } from "lodash";
import { CART } from "../utils/constants";
import { authFetch, fetchRetry, fetchRetryParams } from "../utils/fetch";
import i18n from "../locales/i18n";
import { getToken } from "./token";

export async function getCart(idUser) {
  try {
    const token = getToken();
    if (!token) return [];

    const url = `${process.env.NEXT_PUBLIC_URL_MERCADOPAGO_BACKEND}/carts`;
    const params = {
      headers: {
        "x-token": token,
        "Content-Type": "application/json",
      },
    };
    const result = await fetchRetryParams(url, params);
    return await result.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function cleanCart(idUser, logout) {
  try {
    const url = `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/carts`;
    const params = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        users_permissions_user: idUser,
      }),
    };
    const result = await authFetch(url, params, logout);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function addToCart(idUser, product, quantity, logout) {
  const cart = await getCart(idUser);

  if (cart) {
    let found = false;
    map(cart, (c) => {
      if (c.producto._id === product) found = true;
    });
    if (found) {
      toast.error(i18n.t("cartProductAlreadyInCart"));
      return null;
    }
  }

  try {
    const url = `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/carts`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        users_permissions_user: idUser,
        producto: product,
        quantity,
      }),
    };

    const result = await authFetch(url, params, logout);
    toast.success(i18n.t("cartProductAddedSuccessfully"));
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function countProductsCart(idUser) {
  const cart = await getCart(idUser);

  if (!cart) {
    return 0;
  } else {
    return size(cart);
  }
}

export async function removeItemCart(product, logout) {
  try {
    const url = `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/carts/${product}`;
    const params = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const result = await authFetch(url, params, logout);
    toast.success(i18n.t("cartItemRemovedSuccessfully"));
    return result;
  } catch (error) {
    console.log(error);
    toast.error(i18n.t("cartErrorTryingToDeleteItem"));
    return null;
  }
}

export async function paymentCartApi(token, products, idUser, address, logout) {
  try {
    const addressShipping = address;
    delete addressShipping.user;
    delete addressShipping.createAd;

    const url = `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/orders`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        token,
        products,
        idUser,
        addressShipping,
      }),
    };

    const result = await authFetch(url, params, logout);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
