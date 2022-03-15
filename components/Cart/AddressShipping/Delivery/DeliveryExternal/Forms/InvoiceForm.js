import React, { useState, useEffect } from 'react';
import { Form } from "semantic-ui-react";
import { Dropdown } from 'primereact/dropdown';
import { useTranslation } from 'react-i18next';

export default function InvoiceForm(props) {
    const { formik, docTypes, docType, setDocType, addressEnabled } = props;
    const { t } = useTranslation();

    const docTypeHandleChange = async (e) => {
        await setDocType(e.value);
    }

    useEffect(() => {
        formik.values.invoice_docType = docType;
    }, [docType]);

    return (
        <Form.Group className="form-group" widths="equal">
            <Form.Input
                name="invoice_name"
                placeholder={ t('invoiceFormName') }
                onChange={ formik.handleChange }
                value={ formik.values.invoice_name }
                error={ formik.errors.invoice_name }
                disabled={ addressEnabled }
            />
            <Form.Input
                name="invoice_address"
                placeholder={ t('invoiceFormAddress') }
                onChange={ formik.handleChange }
                value={ formik.values.invoice_address }
                error={ formik.errors.invoice_address }
                disabled={ addressEnabled }
            />
            <Form.Input
                name="invoice_city"
                placeholder={ t('invoiceFormCity') }
                onChange={ formik.handleChange }
                value={ formik.values.invoice_city }
                error={ formik.errors.invoice_city }
                disabled={ addressEnabled }
            />
            <Form.Input
                name="invoice_state"
                placeholder={ t('invoiceFormState') }
                onChange={ formik.handleChange }
                value={ formik.values.invoice_state }
                error={ formik.errors.invoice_state }
                disabled={ addressEnabled }
            />
            <Form.Input
                name="invoice_zipCode"
                placeholder={ t('invoiceFormZipCode') }
                onChange={ formik.handleChange }
                value={ formik.values.invoice_zipCode }
                error={ formik.errors.invoice_zipCode }
                disabled={ addressEnabled }
            />
            <Form.Input
                name="invoice_phone"
                placeholder={ t('invoiceFormPhone') }
                onChange={ formik.handleChange }
                value={ formik.values.invoice_phone }
                error={ formik.errors.invoice_phone }
            />

            <Form.Group className="doc-group">
                <Dropdown className="dropdown-form"
                    options={ docTypes }
                    value={ docType }
                    onChange={ docTypeHandleChange }
                    optionLabel="label"
                    placeholder={ t('invoiceFormDocType') }
                />
                <Form.Input
                    className="invoice-name"
                    name="invoice_docNumber"
                    placeholder={ t('invoiceFormDocNumber') }
                    onChange={ formik.handleChange }
                    value={ formik.values.invoice_docNumber }
                    error={ formik.errors.invoice_docNumber }
                />
            </Form.Group>
        </Form.Group>
    )
}
