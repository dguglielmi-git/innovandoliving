import React, { useState } from 'react';
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import useAuth from "../../../hooks/useAuth";
import { useTranslation } from "react-i18next";
import { createAddressApi, updateAddressApi } from "../../../api/address"
import { toast } from 'react-toastify';
import "../../../locales/i18n";

export default function AddressForm(props) {
    const { setShowModal, setReloadAddresses, newAddress, address } = props;
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();
    const { auth, logout } = useAuth();

    const formik = useFormik({
        initialValues: initialValues(address),
        validateOnChange: false,
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            newAddress
                ? createAddress(formData)
                : updateAddress(formData)
        },
    });

    const createAddress = async (formData) => {
        setLoading(true);
        const formDataTemp = {
            ...formData,
            users_permissions_user: auth.idUser,
        }
        const response = await createAddressApi(formDataTemp, logout);
        if (!response) {
            toast.warning(t('accountAddressFormErrorAddress'));
            setLoading(false);
        } else {
            setReloadAddresses(true);
            setLoading(false);
            setShowModal(false);
            toast.success(t('accountAddressFormOkCreated'));
            formik.resetForm();
        }

    }

    const updateAddress = async (formData) => {
        setLoading(true);
        const formDataTemp = {
            ...formData,
            users_permissions_user: auth.idUser,
        };

        const response = await updateAddressApi(address._id, formDataTemp, logout);
        if (!response) {
            toast.warning(t('accountAddressFormErrorUpdate'));
            setLoading(false);
        } else {
            toast.success(t('accountAddressFormOkUpdate'));
            formik.resetForm();
            setReloadAddresses(true);
            setLoading(false);
            setShowModal(false);
        }
    }

    return (
        <div className="address-form">
            <Form onSubmit={formik.handleSubmit}>
                <Form.Input
                    name="title"
                    type="text"
                    label={t('accountAddressFormAddressTitle')}
                    placeholder={t('accountAddressFormAddressTitle')}
                    onChange={formik.handleChange}
                    value={formik.values.title}
                    error={formik.errors.title}
                />
                <Form.Group widths="equal">
                    <Form.Input
                        name="name"
                        type="text"
                        label={t('accountAddressFormNameLastname')}
                        placeholder={t('accountAddressFormNameLastname')}
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        errror={formik.errors.name}
                    />
                    <Form.Input
                        name="address"
                        type="text"
                        label={t('accountAddressFormAddress')}
                        placeholder={t('accountAddressFormAddress')}
                        onChange={formik.handleChange}
                        value={formik.values.address}
                        errror={formik.errors.address}
                    />
                </Form.Group>
                <Form.Group widths="equal">
                    <Form.Input
                        name="city"
                        type="text"
                        label={t('accountAddressFormCity')}
                        placeholder={t('accountAddressFormCity')}
                        onChange={formik.handleChange}
                        value={formik.values.city}
                        errror={formik.errors.city}
                    />
                    <Form.Input
                        name="state"
                        type="text"
                        label={t('accountAddressFormState')}
                        placeholder={t('accountAddressFormState')}
                        onChange={formik.handleChange}
                        value={formik.values.state}
                        errror={formik.errors.state}
                    />
                </Form.Group>
                <Form.Group widths="equal">
                    <Form.Input
                        name="postalCode"
                        type="text"
                        label={t('accountAddressFormZipCode')}
                        placeholder={t('accountAddressFormZipCode')}
                        onChange={formik.handleChange}
                        value={formik.values.postalCode}
                        errror={formik.errors.postalCode}
                    />
                    <Form.Input
                        name="phone"
                        type="text"
                        label={t('accountAddressFormPhone')}
                        placeholder={t('accountAddressFormPhone')}
                        onChange={formik.handleChange}
                        value={formik.values.phone}
                        errror={formik.errors.phone}
                    />
                </Form.Group>
                <div className="button-actions">
                    <Button className="submit" type="submit" loading={loading}>
                        {newAddress
                            ? t('accountAddressFormButtonCreate') 
                            : t('accountAddressFormButtonUpdate')
                        }
                    </Button>
                </div>
            </Form>
        </div>
    )
}

function initialValues(address) {
    return {
        title: address?.title || "",
        name: address?.name || "",
        address: address?.address || "",
        city: address?.city || "",
        state: address?.state || "",
        postalCode: address?.postalCode || "",
        phone: address?.phone || "",
    }
}

function validationSchema() {
    return {
        title: Yup.string().required(true),
        name: Yup.string().required(true),
        address: Yup.string().required(true),
        city: Yup.string().required(true),
        state: Yup.string().required(true),
        postalCode: Yup.string().required(true),
        phone: Yup.string().required(true),
    }
}