import {
  DEFAULT_SORT_PRODUCT_ITEMS,
  FILTER_PRODUCTS_BY_PLATFORM,
  USER_CLIENT,
  USER_OWNER,
} from "../utils/constants";
import { fetchRetryParams } from "../utils/fetch";
import { getBackendURL } from "../utils/util";
import { getToken } from "./token";

export async function getPublishedProducts(limit) {
  try {
    const params = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const url = `${getBackendURL()}/publishedProducts?${DEFAULT_SORT_PRODUCT_ITEMS}${limit}`;
    const result = await fetchRetryParams(url, params);
    return await result.json();
  } catch (error) {
    console.error(`getPublishedProducts error: ${error}`);
    return [];
  }
}

export async function getProductsByPlatform(platform, limit, start) {
  try {
    const params = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const url = `${getBackendURL()}/productsByPlatform/${platform}?${FILTER_PRODUCTS_BY_PLATFORM}${start}&limit=${limit}`;
    const result = await fetchRetryParams(url, params);
    return await result.json();
  } catch (error) {
    console.log(error);
    console.error(`getProductsByPlatform error: ${error}`);
    return [];
  }
}

export async function getProductByID(idProduct) {
  try {
 
    const params = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const url = `${getBackendURL()}/productById/${idProduct}`;
    const result = await fetchRetryParams(url, params);
    return await result.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function searchProductByTitle(title) {
  try {
    
    const params = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const url = `${getBackendURL()}/productByTitle/${title}`;
    const result = await fetchRetryParams(url, params);
    return await result.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function addMessageToProduct(
  productName,
  productId,
  userId,
  username,
  message,
  icon
) {
  try {
    const url = `${process.env.NEXT_PUBLIC_URL_MERCADOPAGO_BACKEND}/chat`;

    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-token": getToken(),
      },
      body: JSON.stringify({
        productName: productName,
        productId: productId,
        userId: userId,
        username: username,
        message: message,
        icon: icon,
        msgread: icon === USER_CLIENT ? 1 : 0,
        msgreadowner: icon === USER_OWNER ? 1 : 0,
      }),
    };

    const result = await fetchRetryParams(url, params);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function markChatMessageAsRead(productId, userId, userType) {
  try {
    const url = `${process.env.NEXT_PUBLIC_URL_MERCADOPAGO_BACKEND}/chat/message`;

    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-token": getToken(),
      },
      body: JSON.stringify({
        productId: productId,
        userId: userId,
        userType: userType,
      }),
    };

    const result = await fetchRetryParams(url, params);
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getChatMessagesByProduct(productId, userId) {
  try {
    const url = `${process.env.NEXT_PUBLIC_URL_MERCADOPAGO_BACKEND}/chat/messages/${productId}/${userId}`;

    const params = getJsonHeader();

    const result = await fetchRetryParams(url, params);
    const response = await result.json();
    if (response.error !== undefined) {
      return [];
    }
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getOpenChats() {
  try {
    const url = `${process.env.NEXT_PUBLIC_URL_MERCADOPAGO_BACKEND}/chat/open`;

    const params = getJsonHeader();

    const result = await fetchRetryParams(url, params);
    const response = await result.json();
    if (response.error !== undefined) {
      return [];
    }
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
}

const getJsonHeader = () => ({
  headers: {
    "Content-Type": "application/json",
    "x-token": getToken(),
  },
});

export async function getUnreadMsgs() {
  try {
    const url = `${process.env.NEXT_PUBLIC_URL_MERCADOPAGO_BACKEND}/chat/unreadmsg`;

    const params = getJsonHeader();

    const result = await fetchRetryParams(url, params);
    const response = await result.json();
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
}
