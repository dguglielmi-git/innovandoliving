import {
	RES_SMALL,
	RES_MEDIUM,
	RES_LARGE,
	RES_XL
} from "./breakpoint";
import { IS_NORMAL_USER, IS_OWNER, USER_CLIENT } from "./constants";
import i18n from "../locales/i18n";

const dollarCurrency = { style: 'currency', currency: 'ARS' };
const dollarFormat = new Intl.NumberFormat('es-ES', dollarCurrency);

export function numToDollar(number) {
	return "$".concat(dollarFormat.format(number).replace('ARS', ''));
}

export const formatDate = (date) => {
	const d = new Date(date);
	return (d.toLocaleDateString() + ' - ' + d.toLocaleTimeString() + 'hs');
}

export const getDiscountPrice = (price, discount) => (price - ((price * discount) / 100));

export function getEntries(entries) {
	let result = {}
	for (let entry of entries) {
		let [key, val] = entry
		if (key.endsWith('[]')) {
			key = key.slice(0, -2);
			(result[key] || (result[key] = [])).push(val)
		} else {
			result[key] = val
		}
	}
	return result;
}

export function verifyUserType(userType) {
	if (userType === USER_CLIENT) {
		return IS_NORMAL_USER;
	} else {
		return IS_OWNER;
	}
}

export const getTotalItems = (items) =>
	items.reduce((sum, item) => sum + (item.quantity * item.unit_price), 0)


export const formatInvoiceAddress = (formData) => ({
	invoice_address: formData.invoice_address,
	invoice_city: formData.invoice_city,
	invoice_docNumber: formData.invoice_docNumber,
	invoice_docType: formData.invoice_docType,
	invoice_name: formData.invoice_name,
	invoice_phone: formData.invoice_phone,
	invoice_state: formData.invoice_state,
	invoice_zipCode: formData.invoice_zipCode
})

export const formatTransportAddress = (formData) => ({
	transport_address: formData.transport_address,
	transport_city: formData.transport_city,
	transport_comments: formData.transport_comments,
	transport_name: formData.transport_name,
	transport_state: formData.transport_state,
	transport_zipCode: formData.transport_zipCode
})

export function translateStatus(status) {
	switch (status) {
		case 0:
			return i18n.t('statusOrdered');
		case 1:
			return i18n.t('statusInProgress');
		case 2:
			return i18n.t('statusShipped');
		case 3:
			return i18n.t('statusDelivered');
		case 4:
			return i18n.t('statusDelayed');
		case 5:
			return i18n.t('statusCancelled');
		case 6:
			return i18n.t('statusDeclined');
		case 7:
			return i18n.t('statusRefunded');
		case 8:
			return i18n.t('statusDisputed');
		case 9:
			return i18n.t('statusPartiallyRefunded');
		case 10:
			return i18n.t('statusAwaitingPickup');
		case 11:
			return i18n.t('statusPartiallyShipped');
		case 12:
			return i18n.t('statusPendingPayment');
		case 13:
			return i18n.t('statusPartiallyPaid');
		case 99:
			return i18n.t('statusClosed');
		default:
			return i18n.t('statusUnknown');
	}
}

export const drawTimeLineOfOrder = (status) => {
	let progress = [];

	status.map(hist => progress.push({
		status: translateStatus(hist.status),
	}));

	return progress;
}

export const buildDataComboStructure = (status) => {
	let list = [];
	status.map(stat => {
		list.push({
			key: stat._id,
			text: translateStatus(stat.status),
			value: stat.status,
		})
	})
	return list;
}

export const getColumnsRender = (width) => {
	switch (true) {
		case width > RES_XL:
			return 5;
		case width > RES_LARGE:
			return 4;
		case width > RES_MEDIUM:
			return 3;
		case width > RES_SMALL:
			return 2;
		default:
			return 1;
	}
}

export const calcShippingDelivery = (config, client) => {
	const km_minimum = config.km_minimum;
	const km_price = config.km_price;
	const distance_minimum_km = parseFloat(config.km_minimum);
	const distance_client = parseFloat((client.value_distance) / 1000);
	if (distance_client <= distance_minimum_km) {
		return (parseFloat(km_minimum) * parseFloat(km_price));
	} else {
		return (parseFloat(km_price) * parseFloat(distance_client));
	}
}