import { URL_MERCADOPAGO_BACKEND } from "../utils/constants";
import { getToken } from "./token";

export async function getOrdersApi(logout) {
    const token = getToken();

    if (!token) {
        logout();
    }

    try {
        const url = `${URL_MERCADOPAGO_BACKEND}/orders`;
        const params = {
            headers: {
                'x-token': token,
                'Content-Type': 'application/json'
            }
        }
        const orders = await fetch(url, params);
        return orders;


    } catch (error) {
        console.log(error);
        return null;
    }
}