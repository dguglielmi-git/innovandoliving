import React, {useState} from 'react';
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { updatePasswordApi } from "../../../api/user";
import "../../../locales/i18n";

export default function ChangePasswordForm(props) {
    const { user, logout } = props;
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();

    const formik = useFormik({
        initialValues: initialValues(),
        validateOnChange: false,
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true);
            const response = await updatePasswordApi(user.id, formData.password, logout);
            if (!response) {
                toast.error(t('accountChangePasswordFormErrorUpdate'));
            } else {
                toast.success(t('accountChangePasswordFormOkUpdate'));
                logout();
            }
            setLoading(false);
        }
    })

    return (
        <div className="change-password-form">
            <h4>{t('accountChangePasswordFormChangePass')}</h4>
            <Form onSubmit={formik.handleSubmit}>
                <Form.Group widths="equal">
                    <Form.Input
                        name="password"
                        type="password"
                        placeholder={t('accountChangePasswordFormInputPass')}
                        onChange={formik.handleChange}
                        value={formik.values.password}
                        error={formik.errors.password}
                    />
                    <Form.Input
                        name="repeatPassword"
                        type="password"
                        placeholder={t('accountChangePasswordFormRepeatPass')}
                        onChange={formik.handleChange}
                        value={formik.values.repeatPassword}
                        error={formik.errors.repeatPassword}
                    />
                </Form.Group>
                <Button className="submit" loading={loading}>
                    {t('accountChangePasswordFormButtonUpdate')}
                </Button>
            </Form>
        </div>
    )
}

function initialValues() {
    return {
        password: "",
        repeatPassword: "",
    }
}

function validationSchema() {
    return {
        password: Yup.string().required(true).oneOf([Yup.ref("repeatPassword")], true),
        repeatPassword: Yup.string().required(true).oneOf([Yup.ref("password")], true),
    }
}