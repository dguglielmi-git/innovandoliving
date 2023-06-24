import { fetchRetryParams } from "../utils/fetch";
import { getToken } from "./token";
import { getBackendURL } from "../utils/util";
import {
  ITEM_NOT_ADDED_TO_FAVORITES,
  ITEM_NOT_REMOVED,
  ITEM_REMOVED_FROM_FAVORITES,
} from "../utils/constants";
import {
  HTTP_REQUEST_OK_CREATED,
  HTTP_REQUEST_OK_NO_CONTENT,
  SUCCESSFUL_HTTP_REQUEST,
} from "../utils/http_constants";

export async function isFavoriteApi(idProduct, logout) {
  try {
    const token = getToken();
    if (!token) {
      logout();
      return false;
    }

    const url = `${getBackendURL()}/isFavorite/${idProduct}`;
    const params = {
      headers: {
        "x-token": token,
        "Content-Type": "application/json",
      },
    };
    const result = await fetchRetryParams(url, params);
    return (await result.status) === HTTP_REQUEST_OK_NO_CONTENT ? true : false;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function addFavoriteApi(idProduct, logout) {
  try {
    const token = getToken();
    if (!token) {
      logout();
      return null;
    }

    const url = `${getBackendURL()}/favorite`;
    const params = {
      method: "POST",
      headers: {
        "x-token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        producto: idProduct,
      }),
    };

    const result = await fetchRetryParams(url, params);

    if (result.status === HTTP_REQUEST_OK_CREATED) {
      console.info(ITEM_ADDED_TO_FAVORITES);
    } else {
      console.info(`${ITEM_NOT_ADDED_TO_FAVORITES} ${result.status}`);
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function removeFavoriteApi(idProduct, logout) {
  try {
    const token = getToken();
    if (!token) {
      logout();
      return null;
    }

    const url = `${getBackendURL()}/favorite/${idProduct}`;
    const params = {
      method: "DELETE",
      headers: {
        "x-token": token,
        "Content-Type": "application/json",
      },
    };

    const result = await fetchRetryParams(url, params);
    if (result.status === SUCCESSFUL_HTTP_REQUEST) {
      console.info(ITEM_REMOVED_FROM_FAVORITES);
    } else {
      console.info(`${ITEM_NOT_REMOVED} ${result.status}`);
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getFavoriteApi(logout) {
  try {
    const token = getToken();
    if (!token) {
      logout();
      return null;
    }

    const url = `${getBackendURL()}/favorites`;
    const params = {
      headers: {
        "x-token": token,
        "Content-Type": "application/json",
      },
    };
    const result = await fetchRetryParams(url, params);
    if (result.status !== SUCCESSFUL_HTTP_REQUEST) {
      return null;
    }
    return result.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}
