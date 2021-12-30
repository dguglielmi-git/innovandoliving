import React from "react";
import { Form, Button } from "semantic-ui-react";

export default function RegisterFormBody(props) {
    const { t, formik, loading } = props;

    return (
        <Form className="login-form" onSubmit={ formik.handleSubmit }>
            <Form.Input
                title="name"
                name="name"
                type="text"
                placeholder={ t('authRegisterFormName') }
                onChange={ formik.handleChange }
                error={ formik.errors.name }
            ></Form.Input>
            <Form.Input
                title="lastname"
                name="lastname"
                type="text"
                placeholder={ t('authRegisterFormLastname') }
                onChange={ formik.handleChange }
                error={ formik.errors.lastname }
            ></Form.Input>
            <Form.Input
                title="username"
                name="username"
                type="text"
                placeholder={ t('authRegisterFormUsername') }
                onChange={ formik.handleChange }
                error={ formik.errors.username }
            ></Form.Input>
            <Form.Input
                title="email"
                name="email"
                type="text"
                placeholder={ t('authRegisterFormEmail') }
                onChange={ formik.handleChange }
                error={ formik.errors.email }
            ></Form.Input>
            <Form.Input
                title="password"
                aria-label="password"
                name="password"
                type="password"
                placeholder={ t('authRegisterFormPassword') }
                onChange={ formik.handleChange }
                error={ formik.errors.password }
            ></Form.Input>
            <div className="button-actions">
                <Button type="button" basic>
                    { t('authRegisterFormButtonLogin') }
                </Button>
                <Button
                    type="submit"
                    className="submit"
                    loading={ loading }
                >
                    { t('authRegisterFormButtonRegister') }
                </Button>
            </div>
        </Form>
    )
}