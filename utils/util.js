import useAuth from "../hooks/useAuth";
const dollarCurrency = { style: 'currency', currency: 'ARS' };
const dollarFormat = new Intl.NumberFormat('es-ES', dollarCurrency);

export function numToDollar(number) {
	return "$".concat(dollarFormat.format(number).replace('ARS', ''));
}

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