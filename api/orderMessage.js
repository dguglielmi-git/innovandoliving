import { URL_MERCADOPAGO_BACKEND } from "../utils/constants";
import { getToken } from "./token";

export async function addMessage(username, orderId, message, icon) {

    try {
        const url = `${URL_MERCADOPAGO_BACKEND}/ordermessage`;

        const params = {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
                "x-token": getToken()
            },
            body: JSON.stringify({
                orderId: orderId,
                username: username,
                message: message,
                icon: icon,
                msgread: 1,
            })
        }

        const result = await fetch(url, params);
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function markMessageAsRead(orderId) {

    try {
        const url = `${URL_MERCADOPAGO_BACKEND}/order/message/read/${orderId}`;

        const params = {
            method: 'PUT',
            headers: {
                'Content-Type': "application/json",
                "x-token": getToken()
            }
        }

        const result = await fetch(url, params);
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function getMessagesByOrder(orderId) {
    try {
        const url = `${URL_MERCADOPAGO_BACKEND}/order/messages/${orderId}`;

        const params = {
            headers: {
                'Content-Type': 'application/json',
                'x-token': getToken()
            }
        }

        const result = await fetch(url, params);
        const response = await result.json();
        return response;
    }
    catch (error) {
        console.log(error);
        return null;
     }
}