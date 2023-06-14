import { fetchRetryParams } from "../utils/fetch";
import { getBackendURL } from "../utils/util";
import { getToken } from "./token";

export async function getDocTypes() {
  try {
    const token = getToken();
    if (!token) {
      return null;
    }

    const url = `${getBackendURL()}/doctypes`;
    const params = {
      headers: {
        "x-token": token,
        "Content-Type": "application/json",
      },
    };
    const result = await fetchRetryParams(url, params);
    return await result.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}
