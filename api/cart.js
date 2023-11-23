import { toast } from "react-toastify";
import { size, map } from "lodash";
import { getToken } from "./token";
import { getBackendURL } from "../utils/util";
import { fetchRetryParams } from "../utils/fetch";
import i18n from "../locales/i18n";

export async function getCart() {
  try {
    const token = getToken();
    if (!token) return [];

    const url = `${getBackendURL()}/carts`;
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

export async function cleanCart(logout) {
  try {
    const token = getToken();
    if (!token) {
      logout();
    }

    const url = `${getBackendURL()}/cleanCart`;
    const params = {
      method: "DELETE",
      headers: {
        "x-token": token,
        "Content-Type": "application/json",
      },
    };
    const result = await fetchRetryParams(url, params);
    return await result.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function addToCart(idUser, product, quantity, logout) {
  const token = getToken();
  if (!token) {
    logout();
  }

  const cart = await getCart();

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
    const url = `${getBackendURL()}/addToCart`;
    const params = {
      method: "POST",
      headers: {
        "x-token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        users_permissions_user: idUser,
        producto: product,
        quantity,
      }),
    };

    const result = await fetchRetryParams(url, params);
    toast.success(i18n.t("cartProductAddedSuccessfully"));
    return await result.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function removeItemCart(idItemCart, logout) {
  try {
    const token = getToken();
    if (!token) {
      logout();
    }

    const url = `${getBackendURL()}/removeFromCart`;
    const params = {
      method: "DELETE",
      headers: {
        "x-token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        itemCartToRemove: idItemCart,
      }),
    };

    const result = await fetchRetryParams(url, params);
    toast.success(i18n.t("cartItemRemovedSuccessfully"));
    return await result.json();
  } catch (error) {
    console.log(error);
    toast.error(i18n.t("cartErrorTryingToDeleteItem"));
    return null;
  }
}

export async function countProductsCart() {
  const cart = await getCart();

  if (!cart) {
    return 0;
  } else {
    return size(cart);
  }
}
