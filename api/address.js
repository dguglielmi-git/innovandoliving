import {
    SERVER_ADDRESS,
    NOT_FOUND,
    ORIGIN_DELIVERY_ADDRESS,
    CORS_PROXY,
    GOOGLE_MAPS_GEOCODE_URL,
    GOOGLE_MAPS_DISTANCE_MATRIX_URL
} from "../utils/constants";
import { INTERNAL_SERVER_ERROR } from "../utils/http_constants";
import { authFetch } from "../utils/fetch";

export async function getOriginDeliveryAddress() {
    return ORIGIN_DELIVERY_ADDRESS;
}

export async function createAddressApi(address, logout) {
    try {
        const targetAddress = `${address.address}, ${address.city}, ${address.state}`;
        const fullAddressString = await getFullAddressString(targetAddress);

        if (fullAddressString === NOT_FOUND) {
            throw new Error(`Not a valid Address received: ${targetAddress}`);
        }
        const distance = await getDistanceBetweenAddresses(getOriginDeliveryAddress(), fullAddressString);
        const { text, value } = await distance;

        const finalAddress = {
            ...address,
            formatted_distance: text,
            value_distance: value,
        }

        const url = `${SERVER_ADDRESS}/addresses`;
        const params = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(finalAddress),
        };
        const result = await authFetch(url, params, logout);
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function getFullAddressString(address) {
    try {
        const result = await fetch(`${CORS_PROXY}${getMapsGeocodeUrl(address)}`);
        const { results } = await result.json();
        if (results) {
            return results[0].formatted_address
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
    const url = `${GOOGLE_MAPS_GEOCODE_URL}address=${address}&key=${APIKEY}`;
    return url;
}

const getMapsDistanceMatrixUrl = (from, to) => {
    const APIKEY = process.env.NEXT_PUBLIC_MAPS_API_KEY;
    const url = `${GOOGLE_MAPS_DISTANCE_MATRIX_URL}destinations=${to}&origins=${from}&key=${APIKEY}`;
    return url;
}

export async function getDistanceBetweenAddresses(from, to) {
    const result = await fetch(`${CORS_PROXY}${getMapsDistanceMatrixUrl(from, to)}`);
    const data = await result.json();
    return data.rows[0].elements[0].distance
}

export async function getAddressesApi(idUser, logout) {
    try {
        const url = `${SERVER_ADDRESS}/addresses?users_permissions_user=${idUser}`;
        const result = await authFetch(url, null, logout);
        if (result.statusCode === INTERNAL_SERVER_ERROR) throw "Server Error";
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function getAddressById(addressId, logout) {
    try {
        const url = `${SERVER_ADDRESS}/addresses/${addressId}`;
        const result = await authFetch(url, null, logout);
        if (result.statusCode === INTERNAL_SERVER_ERROR) throw "Server Error";
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export async function deleteAddressApi(idAddress, logout) {
    try {
        const url = `${SERVER_ADDRESS}/addresses/${idAddress}`;
        const params = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        };
        const result = await authFetch(url, params, logout);
        if (result.statusCode === INTERNAL_SERVER_ERROR) throw "Server Error";
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export async function updateAddressApi(idAddress, address, logout) {
    try {
        const url = `${SERVER_ADDRESS}/addresses/${idAddress}`;
        const params = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(address),
        };
        const result = await authFetch(url, params, logout);
        return result;
    } catch (error) {
        console.log(error);
        return null;
    }
}