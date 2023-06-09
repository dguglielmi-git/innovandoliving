import { FILTER_SORTED_PLATFORMS, TOKEN_IS_MISSING } from "../utils/constants";
import { fetchRetryParams } from "../utils/fetch";
import { getBackendURL } from "../utils/util";
import { getToken } from "./token";

export async function getSortedPlatforms() {
  try {
    const token = getToken();
    if (!token) {
      console.error(`getSortedPlatforms: ${TOKEN_IS_MISSING}`);
      return [];
    }
    const params = {
      headers: {
        "x-token": token,
        "Content-Type": "application/json",
      },
    };

    const url = `${getBackendURL()}/platforms?${FILTER_SORTED_PLATFORMS}`;
    const result = await fetchRetryParams(url, params);
    return await result.json();
  } catch (error) {
    console.log(error);
    return [];
  }
}
