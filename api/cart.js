import { toast } from "react-toastify";
import { size, map, includes, remove } from "lodash";
import { SERVER_ADDRESS, CART } from "../utils/constants";
import { authFetch } from "../utils/fetch";
import i18n from "../locales/i18n";

export async function getCart(idUser) {
    try {
        const url = `${SERVER_ADDRESS}/carts?users_permissions_user=${idUser}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function cleanCart(idUser, logout) {
    try {
        const url = `${SERVER_ADDRESS}/carts`;
        const params = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                users_permissions_user: idUser
            })
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
            toast.error(i18n.t('cartProductAlreadyInCart'));
            return null;
        }
    }

    try {
        const url = `${SERVER_ADDRESS}/carts`;
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                users_permissions_user: idUser,
                producto: product,
                quantity
            })
        };

        const result = await authFetch(url, params, logout);
        toast.success(i18n.t('cartProductAddedSuccessfully'));
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
        const url = `${SERVER_ADDRESS}/carts/${product}`;
        const params = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        };
        const result = await authFetch(url, params, logout);
        toast.success(i18n.t('cartItemRemovedSuccessfully'));
        return result;

    } catch (error) {
        console.log(error);
        toast.error(i18n.t('cartErrorTryingToDeleteItem'));
        return null;
    }
}

export async function paymentCartApi(token, products, idUser, address, logout) {
    try {
        const addressShipping = address;
        delete addressShipping.user;
        delete addressShipping.createAd;

        const url = `${SERVER_ADDRESS}/orders`;
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                token,
                products,
                idUser,
                addressShipping
            })
        };

        const result = await authFetch(url, params, logout);
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}
