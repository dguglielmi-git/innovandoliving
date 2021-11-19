import React, { useState } from "react";
import { Form, Button } from "semantic-ui-react";
import Typography from '@material-ui/core/Typography';
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import useAuth from "../../../hooks/useAuth";
import { loginApi, resetPasswordApi } from "../../../api/user";
import "../../../locales/i18n";
// import 'fontsource-roboto';

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
        <Form className="login-form" onSubmit={ formik.handleSubmit }>
            <Form.Input
                name="identifier"
                type="text"
                placeholder={ t('authLoginFormInputEmail') }
                onChange={ formik.handleChange }
                error={ formik.errors.identifier }
            />
            <Form.Input
                title="password"
                name="password"
                type="password"
                placeholder={ t('authLoginFormInputPassword') }
                onChange={ formik.handleChange }
                error={ formik.errors.password }
            />
            <div className="button-actions">
                <Button type="button" basic onClick={ showRegisterForm }>
                    { t('authLoginFormButtonRegister') }
                </Button>
                <Button className="submit" basic type="submit"
                    loading={ loading }
                >
                    { t('authLoginFormButtonLogin') }
                </Button>
            </div>
            <div className="login-forgot">
                <Typography variant="caption" display="block" onClick={ resetPassword }>
                    { t('authLoginFormButtonForgotPass') }
                </Typography>
            </div>

        </Form>
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