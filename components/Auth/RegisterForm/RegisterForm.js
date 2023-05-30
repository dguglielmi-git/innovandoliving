import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { registerApi } from "../../../api/user";
import i18n from "../../../locales/i18n";
import RegisterFormBody from "./RegisterFormBody";
import "../../../locales/i18n";

export default function RegisterForm(props) {
    const { showLoginForm } = props;
    const { t } = useTranslation();
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: initialValues(),
        validateOnChange: false,
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true);
            const response = await registerApi(formData);
            if (response?.jwt) {
                toast.success(t('authRegisterFormOkRegister'));
                showLoginForm();
            } else {
                toast.error(t('authRegisterFormErrorRegister'));
            }
            setLoading(false);
        }
    })

    return <RegisterFormBody
        t={ t }
        formik={ formik }
        loading={ loading }
    />

}

function initialValues() {
    return {
        name: "",
        lastname: "",
        username: "",
        email: "",
        password: "",
        language: i18n.language,
    }
}

function validationSchema() {
    return {
        name: Yup.string().required(true),
        lastname: Yup.string().required(i18n.t('authRegisterFormLastnameRequired')),
        username: Yup.string().required(true),
        email: Yup.string().email(true).required(true),
        password: Yup.string().required(true),
        language: Yup.string().required(true),
    }
}