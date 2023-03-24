import React from "react";
import { Form, Button } from "semantic-ui-react";
import Typography from '@material-ui/core/Typography';

export default function LoginFormBody(props) {

    const { t, formik, showRegisterForm, loading, resetPassword } = props;

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
                <Typography variant="caption" display="block"
                    onClick={ resetPassword }>
                    { t('authLoginFormButtonForgotPass') }
                </Typography>
            </div>

        </Form>
    )
}