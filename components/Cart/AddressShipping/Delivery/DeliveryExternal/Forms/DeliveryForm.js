import React from "react";
import { Form } from "semantic-ui-react";
import { useTranslation } from "react-i18next";

export default function DeliveryForm(props) {
    const { formik } = props;
    const { t } = useTranslation();

    return (
        <Form.Group className="form-group" widths="equal">
            <Form.Input
                title="transport_name"
                name="transport_name"
                placeholder={ t('deliveryFormTransportName') }
                onChange={ formik.handleChange }
                value={ formik.values.transport_name }
                error={ formik.errors.transport_name }
            />
            <Form.Input
                title="transport_address"
                name="transport_address"
                placeholder={ t('deliveryFormTransportAddress') }
                onChange={ formik.handleChange }
                value={ formik.values.transport_address }
                error={ formik.errors.transport_address }
            />
            <Form.Input
                title="transport_city"
                name="transport_city"
                placeholder={ t('deliveryFormTransportCity') }
                onChange={ formik.handleChange }
                value={ formik.values.transport_city }
                error={ formik.errors.transport_city }
            />
            <Form.Input
                title="transport_state"
                name="transport_state"
                placeholder={ t('deliveryFormTransportState') }
                onChange={ formik.handleChange }
                value={ formik.values.transport_state }
                error={ formik.errors.transport_state }
            />
            <Form.Input
                title="transport_zipCode"
                name="transport_zipCode"
                placeholder={ t('deliveryFormTransportZipCode') }
                onChange={ formik.handleChange }
                value={ formik.values.transport_zipCode }
                error={ formik.errors.transport_zipCode }
            />
            <Form.TextArea
                title="transport_comments"
                name="transport_comments"
                placeholder={ t('deliveryFormTransportComments') }
                onChange={ formik.handleChange }
                value={ formik.values.transport_comments }
                error={ formik.errors.transport_comments }
            />
        </Form.Group>
    )
}