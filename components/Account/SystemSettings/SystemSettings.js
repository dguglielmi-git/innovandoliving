import React, { useState } from "react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { Form, Button, Label } from "semantic-ui-react";
import useSettings from "../../../hooks/useSettings"
import { updateSettings } from "../../../api/configurations";

export default function SystemSettings(props) {
    const { logout, setReloadUser } = props;
    const [loading, setLoading] = useState(false);
    const { configs } = useSettings();
    const { t } = useTranslation();

    const formik = useFormik({
        initialValues: initialValues(
            configs?.address_delivery_center,
            configs?.km_minimum,
            configs?.km_price?.$numberDecimal
        ),
        validateOnChange: false,
        validateOnSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true);
            const res = await updateSettings(configs._id, formData, logout);
            if (!res) {
                toast.error(t('systemSettingsErrorUpdating'));
            } else {
                toast.success(t('systemSettingsSuccessUpdating'))
            }
            setReloadUser(true);
            setLoading(false);
        }
    });

    return (
        <div className="system-settings">
            <h4>{ t('systemSettingsHeader') }</h4>
            <Form onSubmit={ formik.handleSubmit }>
                <Label>{ t('systemSettingsWarehouseAddress') }</Label>
                <Form.Input
                    name="address_delivery_center"
                    placeholder={ t('systemSettingsWarehouseAddressPlaceholder') }
                    onChange={ formik.handleChange }
                    value={ formik.values.address_delivery_center }
                    error={ formik.errors.address_delivery_center }
                />
                <Label>{ t('systemSettingsRateKm') }</Label>
                <Form.Input
                    name="km_price"
                    placeholder={ t('systemSettingsRateKmPlaceholder') }
                    value={ formik.values.km_price }
                    error={ formik.errors.km_price }
                    onChange={ formik.handleChange }
                />
                <Label>{ t('systemSettingsMinimumKmDelivery') }</Label>
                <Form.Input
                    name="km_minimum"
                    placeholder={ t('systemSettingsMinimumKmDeliveryPlaceholder') }
                    value={ formik.values.km_minimum }
                    error={ formik.errors.km_minimum }
                    onChange={ formik.handleChange }
                />
                <Button type="submit" className="submit" loading={ loading }>
                    { t('systemSettingsUpdateButton') }
                </Button>
            </Form>
        </div>
    )
}

function initialValues(addressDeliveryCenter, minimumKm, kmPrice) {
    return {
        address_delivery_center: addressDeliveryCenter || "",
        km_minimum: minimumKm || "",
        km_price: kmPrice || "",
    }
}

function validationSchema() {
    return {
        address_delivery_center: Yup.string().required(true),
        km_minimum: Yup.number().required(true),
        km_price: Yup.number().required(true),
    }
}