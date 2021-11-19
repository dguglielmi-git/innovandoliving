const dollarCurrency = { style: 'currency', currency: 'ARS' };
const dollarFormat = new Intl.NumberFormat('es-ES', dollarCurrency);

export function numToDollar(number) {
	return "$".concat(dollarFormat.format(number).replace('ARS', ''));
}

export const formatDate = (date) => {
	const d = new Date(date);
	return (d.toLocaleDateString() + ' - ' + d.toLocaleTimeString() + 'hs');
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

export const getTotalItems = (items) =>
	items.reduce((sum, item) => sum + (item.quantity * item.unit_price),0)


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
			return 'Ordered';
		case 1:
			return 'In Progress'
		case 2:
			return 'Shipped';
		case 3:
			return 'Delivered';
		default:
			return 'Unknown';
	}
}
export const drawOrderProgress = (status) => {
	let progress = [];
	for (let i = 0; i <= status; i++) {
		progress.push({
			status: translateStatus(i),
		})
	}
	return progress;
}