import React, { useState } from 'react';
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { updateEmail } from "../../../api/user"
import "../../../locales/i18n";

export default function ChangeEmailForm(props) {
    const { user, logout, setReloadUser } = props;
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();

    const formik = useFormik({
        initialValues: initialValues(),
        validateOnChange: false,
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true);
            const response = await updateEmail(user.id, formData.email, logout);
            if (!response || response?.statusCode === 400) {
                toast.error(t('accountChangeEmailFormError'));
            } else {
                toast.success(t('accountChangeEmailFormOkUpdate'));
                setReloadUser(true);
                formik.handleReset();
            }
            setLoading(false);
        }
    });


    return (
        <div className="change-email-form">
            <h4>
                {t('accountChangeEmailButtonChangeEmail')}
                <span>{user.email}</span>
            </h4>
            <Form onSubmit={formik.handleSubmit}>
                <Form.Group widths="equal">
                    <Form.Input
                        name="email"
                        placeholder={t('accountChangeEmailFormNewMail')}
                        onChange={formik.handleChange}
                        value={formik.values.email}
                        error={formik.errors.email}
                    />
                    <Form.Input
                        name="repeatEmail"
                        placeholder={t('accountChangeEmailFormNewMail')}
                        onChange={formik.handleChange}
                        value={formik.values.repeatEmail}
                        error={formik.errors.repeatEmail}
                    />
                </Form.Group>
                <Button className="submit" loading={loading}>
                    {t('accountChangeEmailButtonUpdate')}
                </Button>
            </Form>
        </div>
    )
}

function initialValues() {
    return {
        email: "",
        repeatEmail: "",
    }
}

function validationSchema() {
    return {
        email: Yup.string()
            .email(true)
            .required(true)
            .oneOf([Yup.ref("repeatEmail")], true),
        repeatEmail: Yup.string()
            .email(true)
            .required(true)
            .oneOf([Yup.ref("email")], true),
    }
}