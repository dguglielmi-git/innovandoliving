import * as Yup from "yup";

export function initialValues() {
    return {
        transport_name: "",
        transport_address: "",
        transport_city: "",
        transport_state: "",
        transport_zipCode: "",
        transport_comments: "",
        invoice_name: "",
        invoice_address: "",
        invoice_city: "",
        invoice_state: "",
        invoice_zipCode: "",
        invoice_docType: "",
        invoice_docNumber: "",
        invoice_phone: "",
    }
}

export function validationSchema() {
    return {
        transport_name: Yup.string().required(true),
        transport_address: Yup.string().required(true),
        transport_city: Yup.string().required(true),
        transport_state: Yup.string().required(true),
        transport_zipCode: Yup.string().required(true),
        invoice_name: Yup.string().required(true),
        invoice_address: Yup.string().required(true),
        invoice_city: Yup.string().required(true),
        invoice_state: Yup.string().required(true),
        invoice_zipCode: Yup.string().required(true),
        invoice_docNumber: Yup.string().required(true),
    }
}