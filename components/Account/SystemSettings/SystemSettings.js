import React, { useState } from "react";
import { Form, Button, Label } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useSettings from "../../../hooks/useSettings"
import { updateSettings } from "../../../api/configurations";
import { toast } from "react-toastify";

export default function SystemSettings(props) {
    const { logout, setReloadUser } = props;
    const [loading, setLoading] = useState(false);
    const { configs } = useSettings();

    const formik = useFormik({
        initialValues: initialValues(configs?.address_delivery_center, configs?.km_minimum, configs?.km_price),
        validateOnChange: false,
        validateOnSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true);
            const res = await updateSettings(configs._id, formData, logout);
            if (!res) {
                toast.error("Error when trying to update Settings");
            } else {
                toast.success("Settings has been updated successfully")
            }
            setReloadUser(true);
            setLoading(false);
        }
    });

    return (
        <div className="system-settings">
            <h4>System Settings</h4>

            <Form onSubmit={ formik.handleSubmit }>
                <Label>Delivery Address</Label>
                <Form.Input
                    name="address_delivery_center"
                    placeholder="Delivery Origin Address, ex: (Street 123, City, State, Country)"
                    value={ configs?.address_delivery_center }
                    onChange={ formik.handleChange }
                    value={ formik.values.address_delivery_center }
                    error={ formik.errors.address_delivery_center }
                />
                <Label>Rate per Km</Label>
                <Form.Input
                    name="km_price"
                    placeholder="Rate per Km, for instance, if the price per km is $50, type 50 without the $ symbol"
                    value={ formik.values.km_price }
                    error={ formik.errors.km_price }
                    onChange={ formik.handleChange }
                />
                <Label>Minimum Km for Delivery</Label>
                <Form.Input
                    name="km_minimum"
                    placeholder="Set a minimum distance for distances too close"
                    value={ formik.values.km_minimum }
                    error={ formik.errors.km_minimum }
                    onChange={ formik.handleChange }
                />
                <Button className="submit" loading={ loading }>
                    Update
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