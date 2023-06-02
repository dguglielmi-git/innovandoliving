import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import useAuth from "../../../hooks/useAuth";
import { loginApi, resetPasswordApi } from "../../../api/user";
import LoginFormBody from "./LoginFormBody";
import "../../../locales/i18n";

export default function LoginForm(props) {
    const { showRegisterForm, onCloseModal } = props;
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();
    const { login } = useAuth();


    const formik = useFormik({
        initialValues: initialValues(),
        validateOnChange: false,
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true);
            const response = await loginApi(formData);
            if (response?.jwt) {
                login(response.jwt);
                onCloseModal();
            } else {
                toast.error(t('authLoginFormErrorLogin'));
            }
            setLoading(false);
        }
    });

    const resetPassword = () => {
        formik.setErrors({});
        const validateEmail = Yup.string().email().required();
        if (!validateEmail.isValidSync(formik.values.identifier)) {
            formik.setErrors({ identifier: true });
        } else {
            resetPasswordApi(formik.values.identifier);
        }
    }

    return (
        <LoginFormBody
            t={ t }
            formik={ formik }
            showRegisterForm={ showRegisterForm }
            loading={ loading }
            resetPassword={ resetPassword }
        />
    )
}

function initialValues() {
    return {
        identifier: "",
        password: ""
    }
}

function validationSchema() {
    return {
        identifier: Yup.string().email(true).required(true),
        password: Yup.string().required(true),
    }
}