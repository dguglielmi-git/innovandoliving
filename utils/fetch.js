import { getToken, hasExpiredToken } from "../api/token";

export async function authFetch(url, params, logout) {
    const token = getToken();
    if (!token) {
        logout();
    } else {
        if (hasExpiredToken(token)) {
            logout();
        } else {
            const paramsTemp = {
                ...params,
                headers: {
                    ...params?.headers,
                    Authorization: `Bearer ${token}`,
                },
            };
            try {
                const response = await fetch(url, paramsTemp);
                return await response.json();
            } catch (error) {
                console.log(error);
                return error;
            }
        }
    }
}