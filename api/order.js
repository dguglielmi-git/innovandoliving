import { URL_MERCADOPAGO_BACKEND } from "../utils/constants";
import { getToken } from "./token";
import { fetchRetryParams } from "../utils/fetch";

const ORDER_ACTIVE = true;
const ORDER_FINISHED = false;

async function getOrders(logout, active) {
  const token = getToken();

  if (!token) {
    logout();
  }

  try {
    const url = `${URL_MERCADOPAGO_BACKEND}/orders`;
    const params = {
      headers: {
        "x-token": token,
        "Content-Type": "application/json",
        active: active,
      },
    };
    const orders = await fetchRetryParams(url, params);

    return orders;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updateOrderStatus(order, status) {
  try {
    const url = `${URL_MERCADOPAGO_BACKEND}/order/status/${order._id}`;

    const params = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-token": getToken(),
      },
      body: JSON.stringify({
        status: status,
      }),
    };

    const result = await fetchRetryParams(url, params);
    const orderUpdated = await result.json();
    return orderUpdated;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function removeOrder(paymentId) {
  try {
    const url = `${URL_MERCADOPAGO_BACKEND}/order/${paymentId}`;

    const params = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-token": getToken(),
      },
    };

    const result = await fetchRetryParams(url, params);
    const orderRemoved = await result.json();
    return orderRemoved;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function updatePendingBalance(order, cash, other) {
  const res = await fetchRetryParams(
    `${URL_MERCADOPAGO_BACKEND}/order/balance/pending`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "x-token": getToken(),
      },
      body: JSON.stringify({
        orderId: order._id,
        pendingCash: cash,
        pendingOther: other,
      }),
    }
  );

  const response = await res.json();
  return response;
}

export async function getOrderStatuses() {
  const token = getToken();

  if (!token) {
    logout();
  }

  try {
    const url = `${URL_MERCADOPAGO_BACKEND}/orderstatus`;
    const params = {
      headers: {
        "x-token": token,
        "Content-Type": "application/json",
      },
    };
    const result = await fetchRetryParams(url, params);
    const statuses = await result.json();

    return statuses;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getOrdersApi(logout) {
  const result = await getOrders(logout, ORDER_ACTIVE);
  return result;
}

export async function getFinishedOrdersApi(logout) {
  const response = await getOrders(logout, ORDER_FINISHED);
  return response;
}
