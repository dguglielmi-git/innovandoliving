import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { registerApi } from "../../../api/user";
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

    return (
        <Form className="login-form" onSubmit={formik.handleSubmit}>
            <Form.Input
                name="name"
                type="text"
                placeholder={t('authRegisterFormName')}
                onChange={formik.handleChange}
                error={formik.errors.name}
            ></Form.Input>
            <Form.Input
                name="lastname"
                type="text"
                placeholder={t('authRegisterFormLastname')}
                onChange={formik.handleChange}
                error={formik.errors.lastname}
            ></Form.Input>
            <Form.Input
                name="username"
                type="text"
                placeholder={t('authRegisterFormUsername')}
                onChange={formik.handleChange}
                error={formik.errors.username}
            ></Form.Input>
            <Form.Input
                name="email"
                type="text"
                placeholder={t('authRegisterFormEmail')}
                onChange={formik.handleChange}
                error={formik.errors.email}
            ></Form.Input>
            <Form.Input
                name="password"
                type="password"
                placeholder={t('authRegisterFormPassword')}
                onChange={formik.handleChange}
                error={formik.errors.password}
            ></Form.Input>
            <div className="button-actions">
                <Button type="button" basic>
                    {t('authRegisterFormButtonLogin')}
                </Button>
                <Button type="submit" className="submit" loading={loading}>
                    {t('authRegisterFormButtonRegister')}
                </Button>
            </div>
        </Form>
    )
}

function initialValues() {
    return {
        name: "",
        lastname: "",
        username: "",
        email: "",
        password: ""
    }
}

function validationSchema() {
    return {
        name: Yup.string().required(true),
        lastname: Yup.string().required("El apellido es obligatorio"),
        username: Yup.string().required(true),
        email: Yup.string().email(true).required(true),
        password: Yup.string().required(true),
    }
}