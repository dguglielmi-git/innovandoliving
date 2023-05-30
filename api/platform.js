import { SERVER_ADDRESS } from "../utils/constants";
import { fetchRetry } from "../utils/fetch";

export async function getPlatformsApi() {
    try {
        const url = `${SERVER_ADDRESS}/platforms?_sort=position:asc`;
        const response = await fetchRetry(url);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}