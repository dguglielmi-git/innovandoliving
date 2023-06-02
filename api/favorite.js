import { size } from "lodash";
import { authFetch } from "../utils/fetch";

export async function isFavoriteApi(idUser, idProducto, logout) {
    try {
        const url = `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/favorites?users_permissions_user=${idUser}&producto=${idProducto}`;
        return await authFetch(url, null, logout);
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function addFavoriteApi(idUser, idProducto, logout) {
    try {
        const dataFound = await isFavoriteApi(idUser, idProducto, logout);
        if (size(dataFound) > 0 || !dataFound) {
            return 'already in favorite';
        } else {
            const url = `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/favorites`;
            const params = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(
                    { users_permissions_user: idUser, producto: idProducto }),
            };
            const result = await authFetch(url, params, logout);
            return result;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function removeFavoriteApi(idUser, idProducto, logout) {
    try {
        const dataFound = await isFavoriteApi(idUser, idProducto, logout);
        if (size(dataFound) > 0) {
            const url = `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/favorites/${dataFound[0]?._id}`;
            const params = {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
            };
            const result = authFetch(url, params, logout);
            return result;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function getFavoriteApi(idUser, logout) {
    try {
        const url = `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/favorites?users_permissions_user=${idUser}`;
        const result = await authFetch(url, null, logout);
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}