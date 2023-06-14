import { getBackendURL } from "../utils/util";
import { getToken } from "./token";

// export async function getDocTypes() {
//   try {
//     const url = `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/doc-types`;
//     const response = await fetchRetry(url);
//     const result = await response.json();
//     return result;
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// }

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
    return await response.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}
