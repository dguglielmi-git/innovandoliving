import { getToken } from "./token"
import { URL_MERCADOPAGO_BACKEND } from "../utils/constants";
import { fetchRetryParams } from "../utils/fetch";

export const saveOrder = async (order) => {
    const orderRes = await fetchRetryParams(`${URL_MERCADOPAGO_BACKEND}/order`, {
        headers: {
            'Content-Type': 'application/json',
            "x-token": getToken()
        },
        method: 'POST',
        body: JSON.stringify(order)
    })
    const response = await orderRes.json();
    return response;
}

export const orderUpdate = async (order) => {

    const res = await fetchRetryParams(`${URL_MERCADOPAGO_BACKEND}/order`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'x-token': getToken()
        },
        body: JSON.stringify(order)
    })

    const response = await res.json();
    return response;
}

export const sendProductsToMercadoPago = async (itemsProd) => {
    const result = await fetchRetryParams(`${URL_MERCADOPAGO_BACKEND}/payment`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "items": itemsProd })
    })
    const response = await result.json()
    return response
}

