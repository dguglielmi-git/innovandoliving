import React, { useState, useEffect } from 'react';
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { Divider } from 'primereact/divider';
import { Checkbox } from 'primereact/checkbox';
import { Form, Button, Icon } from "semantic-ui-react";
import DeliveryForm from "./Forms/DeliveryForm";
import InvoiceForm from "./Forms/InvoiceForm";
import { initialValues, validationSchema } from "./functions/formikSchema";
import { getDocTypes } from "../../../../../api/doctypes";


export default function DeliveryExternal(props) {
    const { setStep } = props;
    const [addressEnabled, setAddressEnabled] = useState(false);
    const [docType, setDocType] = useState(null);
    const [docTypes, setDocTypes] = useState([]);

    useEffect(() => {
        (async () => {
            const docs = await getDocTypes();
            if (docs) {
                await setDocTypes(docs);
            }
        })()
    }, []);

    useEffect(() => {
        if (addressEnabled) {
            formik.values.invoice_name      = formik.values.transport_name;
            formik.values.invoice_address   = formik.values.transport_address;
            formik.values.invoice_city      = formik.values.transport_city;
            formik.values.invoice_state     = formik.values.transport_state;
            formik.values.invoice_zipCode   = formik.values.transport_zipCode;
        }
    }, [addressEnabled]);


    const formik = useFormik({
        initialValues: initialValues(),
        validateOnChange: false,
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            console.log('submit running ');
            if (!docType) {
                toast.error('No ha seleccionado documento');
            } else {
                setStep(2);
            }

        }
    });

    const Separator = ({ data }) => (
        <Divider align="center">
            <span className="p-tag">{data}</span>
        </Divider>
    )

    return (
        <div className="delivery-external">
            <Form onSubmit={formik.handleSubmit}>
                <Separator data="Datos para Transporte" />
                <div className="delivery">
                    <DeliveryForm formik={formik} />
                </div>
                <Separator data="Datos de la Factura" />

                <div className="p-field-checkbox">
                    <Checkbox inputId="binary"
                        checked={addressEnabled}
                        onChange={e => setAddressEnabled(!addressEnabled)}
                    />
                    <label>Utilizar misma direccion</label>
                </div>
                <div className="delivery">
                    <InvoiceForm
                        formik={formik}
                        docTypes={docTypes}
                        docType={docType}
                        setDocType={setDocType}
                        addressEnabled={addressEnabled}
                    />
                </div>
                <Divider align="center" />
                <div className="button-submit">
                    <Button className="submit" type="submit">
                        Continuar <Icon name="arrow right" />
                    </Button>
                </div>
            </Form>
        </div>
    )
}