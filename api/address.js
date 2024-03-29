import {
  NOT_FOUND,
  CORS_PROXY,
  ERROR_NOT_VALID_ADDRESS,
} from "../utils/constants";
import { fetchRetry, fetchRetryParams } from "../utils/fetch";
import { getConfigurations } from "./configurations";
import { INTERNAL_SERVER_ERROR } from "../utils/http_constants";
import { getToken } from "./token";

export async function getOriginDeliveryAddress() {
  const configs = await getConfigurations();
  return configs?.address_delivery_center;
}

export async function getFullAddressString(address) {
  try {
    const result = await fetchRetry(
      `${CORS_PROXY}${getMapsGeocodeUrl(address)}`
    );
    const { results } = await result.json();
    if (results) {
      return results[0].formatted_address;
    } else {
      return NOT_FOUND;
    }
  } catch (error) {
    console.log(error);
    return NOT_FOUND;
  }
}

const getMapsGeocodeUrl = (address) => {
  const APIKEY = process.env.NEXT_PUBLIC_MAPS_API_KEY;
  const url = `${process.env.NEXT_PUBLIC_GOOGLE_MAPS_GEOCODE_URL}address=${address}&key=${APIKEY}`;
  return url;
};

const getMapsDistanceMatrixUrl = (from, to) => {
  const APIKEY = process.env.NEXT_PUBLIC_MAPS_API_KEY;
  const url = `${process.env.NEXT_PUBLIC_GOOGLE_MAPS_DISTANCE_MATRIX_URL}destinations=${to}&origins=${from}&key=${APIKEY}`;
  return url;
};

export async function getDistanceBetweenAddresses(from, to) {
  const result = await fetchRetry(
    `${CORS_PROXY}${getMapsDistanceMatrixUrl(from, to)}`
  );
  const data = await result.json();
  return data.rows[0].elements[0].distance;
}

async function getAddressDistanceFormatted(address) {
  try {
    const targetAddress = `${address.address}, ${address.city}, ${address.state}`;
    let fullAddressString = await getFullAddressString(targetAddress);

    if (!!fullAddressString.includes(address.address) === false) {
      fullAddressString = `${address.address}, ${fullAddressString}`;
    }

    if (fullAddressString === NOT_FOUND) {
      throw new Error(`${ERROR_NOT_VALID_ADDRESS} ${targetAddress}`);
    }
    const distance = await getDistanceBetweenAddresses(
      await getOriginDeliveryAddress(),
      fullAddressString
    );
    const { text, value } = await distance;

    return {
      formatted_distance: text,
      value_distance: value,
    };
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
}

export async function createAddressApi(address, logout) {
  const token = getToken();

  if (!token) {
    logout();
  }

  try {
    const formattedDistance = await getAddressDistanceFormatted(address);
    const finalAddress = {
      ...address,
      formatted_distance: formattedDistance.formatted_distance,
      value_distance: formattedDistance.value_distance,
    };

    const url = `${process.env.NEXT_PUBLIC_URL_MERCADOPAGO_BACKEND}/addresses`;
    const params = {
      method: "POST",
      headers: {
        "x-token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(finalAddress),
    };

    const result = await fetchRetryParams(url, params);

    return result;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getAddressesApi(logout) {
  try {
    const token = getToken();

    if (!token) {
      logout();
    }
    const params = {
      headers: {
        "x-token": token,
        "Content-Type": "application/json",
      },
    };
    const url = `${process.env.NEXT_PUBLIC_URL_MERCADOPAGO_BACKEND}/addresses`;

    const result = await fetchRetryParams(url, params);
    if (result.statusCode === INTERNAL_SERVER_ERROR) throw "Server Error";
    return await result.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function getAddressById(addressId, logout) {
  try {
    const token = getToken();

    if (!token) {
      logout();
    }
    const params = {
      headers: {
        "x-token": token,
        "Content-Type": "application/json",
      },
    };
    const url = `${process.env.NEXT_PUBLIC_URL_MERCADOPAGO_BACKEND}/addresses/${addressId}`;
    const result = await fetchRetryParams(url, params);

    return await result.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function deleteAddressApi(idAddress, logout) {
  try {
    const token = getToken();

    if (!token) {
      logout();
    }

    const url = `${process.env.NEXT_PUBLIC_URL_MERCADOPAGO_BACKEND}/addresses/${idAddress}`;
    const params = {
      method: "DELETE",
      headers: {
        "x-token": token,
        "Content-Type": "application/json",
      },
    };
    await fetchRetryParams(url, params);

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function updateAddressApi(idAddress, address, logout) {
  try {
    const token = getToken();

    if (!token) {
      logout();
    }
    const updatedDistance = await getAddressDistanceFormatted(address);
    address.formatted_distance = updatedDistance.formatted_distance;
    address.value_distance = updatedDistance.value_distance;

    const url = `${process.env.NEXT_PUBLIC_URL_MERCADOPAGO_BACKEND}/addresses/${idAddress}`;
    const params = {
      method: "PUT",
      headers: {
        "x-token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(address),
    };

    const result = await fetchRetryParams(url, params);
    return await result.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}
