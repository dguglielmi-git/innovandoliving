import { BASE_PATH } from "../utils/constants";

export async function getDocTypes() {
    try {
        const url = `${BASE_PATH}/doc-types`;
        const response = await fetch(url);
        const result = await response.json();
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}