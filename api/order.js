import { URL_MERCADOPAGO_BACKEND } from "../utils/constants";
import { getToken } from "./token";

const ORDER_ACTIVE = true;
const ORDER_FINISHED = false;

async function getOrders(logout, active) {
    const token = getToken();

    if (!token) {
        logout();
    }

    try {
        const url = `${URL_MERCADOPAGO_BACKEND}/orders`;
        const params = {
            headers: {
                'x-token': token,
                'Content-Type': 'application/json',
                'active': active,
            }
        }
        const orders = await fetch(url, params);

        return orders;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function updateOrderStatus(order, status) {
    try {
        const url = `${URL_MERCADOPAGO_BACKEND}/order/status/${order._id}`;

        const params = {
            method: 'PUT',
            headers: {
                'Content-Type': "application/json",
                "x-token": getToken()
            },
            body: JSON.stringify({
                status: status
            })
        }

        const result = await fetch(url, params);
        const orderUpdated = await result.json();
        return orderUpdated;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function getOrderStatuses() {
    const token = getToken();

    if (!token) {
        logout();
    }

    try {
        const url = `${URL_MERCADOPAGO_BACKEND}/orderstatus`;
        const params = {
            headers: {
                'x-token': token,
                'Content-Type': 'application/json',
            }
        }
        const result = await fetch(url, params);
        const statuses = await result.json();

        return statuses;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function getAllOrders(logout) {
    const result = await getOrders(logout, null);
    return result;
}

export async function getOrdersApi(logout) {
    const result = await getOrders(logout, ORDER_ACTIVE);
    return result;
}

export async function getFinishedOrdersApi(logout) {
    const response = await getOrders(logout, ORDER_FINISHED);
    return response;
}
