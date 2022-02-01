import { CORS_PROXY, SERVER_ADDRESS } from "../utils/constants";
import { authFetch } from "../utils/fetch";
import { getToken } from "./token";

const getJsonHeader = () => ({
    headers: {
        'Content-Type': 'application/json',
        'x-token': getToken()
    }
})

export async function getConfigurations(logout) {
    try {
        const url = `${SERVER_ADDRESS}/configurations`;
        const response = await fetch(url);
        const result = await response.json();
        return result[0];
    } catch (error) {
        console.log(error);
        return null;
    }
}