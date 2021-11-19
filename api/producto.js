import { SERVER_ADDRESS } from "../utils/constants";

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