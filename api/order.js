import { BASE_PATH } from "../utils/constants";
import { authFetch } from "../utils/fetch";

export async function getOrdersApi(idUser, logout) {
    try {
        const url = `${BASE_PATH}/orders?_sort=createAt:desc&users_permissions_user=${idUser}`;
        const result = authFetch(url, null, logout);
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}