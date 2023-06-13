import { FILTER_SORTED_PLATFORMS } from "../utils/constants";
import { fetchRetryParams } from "../utils/fetch";
import { getBackendURL } from "../utils/util";

export async function getSortedPlatforms() {
  try {
    const params = {
      headers: {
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
