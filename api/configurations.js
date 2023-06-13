import { fetchRetryParams } from "../utils/fetch";
import { getBackendURL } from "../utils/util";
import { getToken } from "./token";

export async function getConfigurations() {
  try {
    const token = getToken();
    if (!token) {
      return null;
    }

    const url = `${getBackendURL()}/configurations`;
    const params = {
      headers: {
        "x-token": token,
        "Content-Type": "application/json",
      },
    };
    const result = await fetchRetryParams(url, params);
    return result.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updateSettings(idSettings, data, logout) {
  try {
    const token = getToken();
    if (!token) {
      logout();
    }

    const url = `${getBackendURL()}/updateconfigurations/${idSettings}`;
    const params = {
      method: "PUT",
      headers: {
        "x-token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    };
    const result = await fetchRetryParams(url, params);

    return result ? result.json() : null;
  } catch (error) {
    console.log(error);
    return null;
  }
}
