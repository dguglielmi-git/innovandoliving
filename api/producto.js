import {
    SERVER_ADDRESS,
    URL_MERCADOPAGO_BACKEND,
    USER_CLIENT,
    USER_OWNER
} from "../utils/constants";
import { getToken } from "./token";

export async function getProducts() {
    try {
        const url = `${SERVER_ADDRESS}/productos`;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function getLastProductosApi(limit) {
    try {
        const limitItems = `_limit=${limit}`;
        const sortItems = `_sort=createAt:desc`;
        const url = `${SERVER_ADDRESS}/productos?${limitItems}&${sortItems}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

/**
 * 
 * @param {Platform needed} platform 
 * @param {Quantity limit of products to receive} limit 
 * @param {Starting point of the pagination for retrieving} start 
 */
export async function getProductosPlatformApi(platform, limit, start) {

    try {
        const limitItems = `_limit=${limit}`;
        const sortItems = `_sort=createAt:desc`;
        const startItems = `_start=${start}`;
        const url = `${SERVER_ADDRESS}/productos?platform.url=${platform}&${limitItems}&${sortItems}&${startItems}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function getTotalProductosPlatform(platform) {
    try {
        const url = `${SERVER_ADDRESS}/productos/count?platform.url=${platform}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function getProductoByUrlApi(path) {
    try {
        const url = `${SERVER_ADDRESS}/productos?url=${path}`;
        const response = await fetch(url);
        const result = await response.json();
        return result[0];
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function searchProductosApi(title) {
    try {
        const url = `${SERVER_ADDRESS}/productos?_q=${title}`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function addMessageToProduct(productName, productId, userId, username, message, icon) {
    try {
        const url = `${URL_MERCADOPAGO_BACKEND}/chat`;

        const params = {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
                "x-token": getToken()
            },
            body: JSON.stringify({
                productName: productName,
                productId: productId,
                userId: userId,
                username: username,
                message: message,
                icon: icon,
                msgread: (icon === USER_CLIENT) ? 1 : 0,
                msgreadowner: (icon === USER_OWNER) ? 1 : 0,
            })
        }

        const result = await fetch(url, params);
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function markChatMessageAsRead(productId, userId, userType) {
    try {
        const url = `${URL_MERCADOPAGO_BACKEND}/chat/message`;

        const params = {
            method: 'PUT',
            headers: {
                'Content-Type': "application/json",
                "x-token": getToken()
            },
            body: JSON.stringify({
                productId: productId,
                userId: userId,
                userType: userType
            })
        }

        const result = await fetch(url, params);
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function getChatMessagesByProduct(productId, userId) {
    try {
        const url = `${URL_MERCADOPAGO_BACKEND}/chat/messages/${productId}/${userId}`;

        const params = getJsonHeader()

        const result = await fetch(url, params);
        const response = await result.json();
        if (response.error !== undefined) {
            return [];
        }
        return response;
    }
    catch (error) {
        console.log(error);
        return null;
    }
}

export async function getOpenChats() {
    try {
        const url = `${URL_MERCADOPAGO_BACKEND}/chat/open`;

        const params = getJsonHeader();

        const result = await fetch(url, params);
        const response = await result.json();
        if (response.error !== undefined) {
            return [];
        }
        return response;
    }
    catch (error) {
        console.log(error);
        return null;
    }
}

const getJsonHeader = () => ({
    headers: {
        'Content-Type': 'application/json',
        'x-token': getToken()
    }
})