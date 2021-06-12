import React, { useState } from 'react';
import { Form, Button } from "semantic-ui-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { updateNameApi } from "../../../api/user";
import "../../../locales/i18n";

export default function ChangeNameForm(props) {
    const { user, logout, setReloadUser } = props;
    const [loading, setLoading] = useState(false);
    const { t } = useTranslation();

    const formik = useFormik({
        initialValues: initialValues(user.name, user.lastname),
        validateOnChange: false,
        validationSchema: Yup.object(validationSchema()),
        onSubmit: async (formData) => {
            setLoading(true);
            const response = await updateNameApi(user.id, formData, logout);
            if (!response) {
                toast.error(t('accountChangeNameFormErrorUpdate'));
            } else {
                toast.success(t('accountChangeNameFormOkUpdate'));
                setReloadUser(true);
            }
            setLoading(false);
        }
    });

    return (
        <div className="change-name-form">
            <h4>{t('accountChangeNameFormChangeLabel')}</h4>
            <Form onSubmit={formik.handleSubmit}>
                <Form.Group widths="equal">
                    <Form.Input
                        name="name"
                        placeholder={t('accountChangeNameFormNewName')}
                        value={user.name}
                        onChange={formik.handleChange}
                        value={formik.values.name}
                        error={formik.errors.name}
                    />
                    <Form.Input
                        name="lastname"
                        placeholder={t('accountChangeNameFormNewLastname')}
                        value={user.lastname}
                        onChange={formik.handleChange}
                        value={formik.values.lastname}
                        error={formik.errors.lastname}
                    />
                </Form.Group>
                <Button className="submit" loading={loading}>
                    {t('accountChangeNameFormButtonUpdate')}
                </Button>
            </Form>
        </div>
    )
}

function initialValues(name, lastname) {
    return {
        name: name || "",
        lastname: lastname || "",
    }
}

function validationSchema() {
    return {
        name: Yup.string().required(true),
        lastname: Yup.string().required(true),
    }
}