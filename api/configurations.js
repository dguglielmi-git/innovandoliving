import { SERVER_ADDRESS } from "../utils/constants";
import { authFetch } from "../utils/fetch";

export async function getConfigurations() {
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

export async function updateSettings(idSettings, data, logout) {
    try {
        const url = `${SERVER_ADDRESS}/configurations/${idSettings}`;
        const params = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        };
        const result = await authFetch(url, params, logout);
        return result ? result : null;
    } catch (error) {
        console.log(error);
        return null;
    }
}