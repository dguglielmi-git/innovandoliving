import { USER_CLIENT, USER_OWNER } from "../utils/constants";
import { fetchRetryParams } from "../utils/fetch";
import { getToken } from "./token";

export async function addMessage(username, orderId, message, icon) {
  try {
    const url = `${process.env.NEXT_PUBLIC_URL_MERCADOPAGO_BACKEND}/order/message`;

    const params = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-token": getToken(),
      },
      body: JSON.stringify({
        orderId: orderId,
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

export async function markMessageAsRead(orderId, userType) {
  try {
    const url = `${process.env.NEXT_PUBLIC_URL_MERCADOPAGO_BACKEND}/order/message/read/${orderId}`;

    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-token": getToken(),
      },
      body: JSON.stringify({
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

export async function getMessagesByOrder(orderId) {
  try {
    const url = `${process.env.NEXT_PUBLIC_URL_MERCADOPAGO_BACKEND}/order/messages/${orderId}`;

    const params = {
      headers: {
        "Content-Type": "application/json",
        "x-token": getToken(),
      },
    };

    const result = await fetchRetryParams(url, params);
    const response = await result.json();
    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function isUserOwner(userId) {
  try {
    const url = `${process.env.NEXT_PUBLIC_URL_MERCADOPAGO_BACKEND}/userowner/${userId}`;

    const params = {
      headers: {
        "Content-Type": "application/json",
        "x-token": getToken(),
      },
    };

    const resultCall = await fetchRetryParams(url, params);
    const response = await resultCall.json();
    const { result } = await response;
    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}
