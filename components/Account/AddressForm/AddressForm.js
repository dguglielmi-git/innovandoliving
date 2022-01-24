import React, { useState } from 'react';
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from 'react-toastify';
import { useTranslation } from "react-i18next";
import { createAddressApi, updateAddressApi } from "../../../api/address"
import useAuth from "../../../hooks/useAuth";
import FormBody from "./FormBody";
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

    const successfulOperation = (message) => {
        setReloadAddresses(true);
        setLoading(false);
        setShowModal(false);
        toast.success(message);
        formik.resetForm();
    }

    const failedOperation = (message) => {
        toast.warning(message);
        setLoading(false);
    }

    const createAddress = async (formData) => {
        setLoading(true);
        const formDataTemp = {
            ...formData,
            users_permissions_user: auth.idUser,
        }
        const response = await createAddressApi(formDataTemp, logout);
        if (!response) {
            failedOperation(t('accountAddressFormErrorAddress'));
        } else {
            successfulOperation(t('accountAddressFormOkCreated'));
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
            failedOperation(t('accountAddressFormErrorUpdate'));
        } else {
            successfulOperation(t('accountAddressFormOkUpdate'));
        }
    }

    return (
        <FormBody
            t={ t }
            formik={ formik }
            loading={ loading }
            newAddress={ newAddress }
        />
    )
}

function initialValues(address) {
    return {
        title: address?.title || "",
        name: address?.name || "",
        address: address?.address || "",
        city: address?.city || "",
        state: address?.state || "",
        zipCode: address?.zipCode || "",
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
        zipCode: Yup.string().required(true),
        phone: Yup.string().required(true),
    }
}