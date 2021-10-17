import { toast } from "react-toastify";
import { size, map, includes, remove } from "lodash";
import { SERVER_ADDRESS, CART } from "../utils/constants";
import { authFetch } from "../utils/fetch";

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
            body:JSON.stringify({
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
            toast.error('Este producto ya esta en el carrito');
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
        toast.success("Producto agregado correctamente");
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
        toast.success('El item se ha eliminado del carrito');
        return result;

    } catch (error) {
        console.log(error);
        toast.error('Ha ocurrido un error al intentar eliminar el item.');
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


/**
 * 
 * @deprecated: use cleanCart() 
 */
export function removeAllProductsCart() {
    localStorage.removeItem(CART);
}

/**
 * 
 * @deprecated: use removeItemCart(product)
 */
export function removeProductCart(product) {
    const cart = getProductsCart();
    remove(cart, (item) => {
        return item === product;
    });

    if (size(cart) > 0) {
        localStorage.setItem(CART, cart);
    } else {
        localStorage.removeItem(CART);
    }
}


/**
 * 
 * @deprecated Use getCart()
 */
 export function getProductsCart() {
    const cart = localStorage.getItem(CART);

    if (!cart) {
        return null;
    } else {
        const products = cart.split(",");
        return products;
    }
}

/**
 * When refactoring, this function must be erased
 * Delete it after verifying that it's not being used anywhere.
 * @deprecated: You must use addToCart()
 */
 export function addProductCart(product) {
    const cart = getProductsCart();

    if (!cart) {
        localStorage.setItem(CART, product);
        toast.success("Producto agregado al carrito");
    } else {
        const productFound = includes(cart, product);
        if (productFound) {
            toast.warning("Este producto ya esta en el carrito");
        } else {
            cart.push(product);
            localStorage.setItem(CART, cart);
            toast.success("Producto agregado correctamente");
        }
    }
}
