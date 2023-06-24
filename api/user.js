import { fetchRetryParams } from "../utils/fetch";
import { SUCCESSFUL_HTTP_REQUEST } from "../utils/http_constants";
import { getBackendURL } from "../utils/util";
import { getToken } from "./token";

export async function loginApi(formData) {
  try {
    const url = `${getBackendURL()}/login`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };
    const result = await fetchRetryParams(url, params);
    return result.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function registerApi(formData) {
  try {
    const url = `${getBackendURL()}/register`;
    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };

    const result = await fetchRetryParams(url, params);
    return result.json();
  } catch (error) {
    console.log(error);
    return {
      error,
      registered: false,
    };
  }
}

export async function getMeApi(logout) {
  try {
    const token = getToken();
    if (!token) {
      logout();
      return null;
    }

    const url = `${getBackendURL()}/users/me`;
    const params = {
      headers: {
        "x-token": token,
        "Content-Type": "application/json",
      },
    };
    const result = await fetchRetryParams(url, params);
    if (result?.status !== SUCCESSFUL_HTTP_REQUEST) {
      return null;
    }
    return result.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function updateUser(fieldToUpdate, logout) {
  try {
    const token = getToken();
    if (!token) {
      logout();
      return null;
    }

    const url = `${getBackendURL()}/users/update`;
    const params = {
      method: "PUT",
      headers: {
        "x-token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(fieldToUpdate),
    };

    const result = await fetchRetryParams(url, params);
    return await result.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function resetPasswordApi(email) {
  try {
    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
}

// export async function resetPasswordApi(email) {
//   try {
//     const url = `${process.env.NEXT_PUBLIC_SERVER_ADDRESS}/auth/forgot-password`;
//     const params = {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ email }),
//     };
//     const response = await fetchRetryParams(url, params);
//     const result = await response.json();
//     return result;
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// }
