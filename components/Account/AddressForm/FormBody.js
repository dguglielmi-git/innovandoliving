import React from "react";
import { Form, Button } from "semantic-ui-react";

export default function FormBody(props) {
    const { t, formik, loading, newAddress } = props;

    return (
        <div className="address-form">
            <Form onSubmit={ formik.handleSubmit }>
                <Form.Input
                    title="title"
                    name="title"
                    type="text"
                    label={ t('accountAddressFormAddressTitle') }
                    placeholder={ t('accountAddressFormAddressTitle') }
                    onChange={ formik.handleChange }
                    value={ formik.values.title }
                    error={ formik.errors.title }
                />
                <Form.Group widths="equal">
                    <Form.Input
                        title="name"
                        name="name"
                        type="text"
                        label={ t('accountAddressFormNameLastname') }
                        placeholder={ t('accountAddressFormNameLastname') }
                        onChange={ formik.handleChange }
                        value={ formik.values.name }
                        errror={ formik.errors.name }
                    />
                    <Form.Input
                        title="address"
                        name="address"
                        type="text"
                        label={ t('accountAddressFormAddress') }
                        placeholder={ t('accountAddressFormAddress') }
                        onChange={ formik.handleChange }
                        value={ formik.values.address }
                        errror={ formik.errors.address }
                    />
                </Form.Group>
                <Form.Group widths="equal">
                    <Form.Input
                        title="city"
                        name="city"
                        type="text"
                        label={ t('accountAddressFormCity') }
                        placeholder={ t('accountAddressFormCity') }
                        onChange={ formik.handleChange }
                        value={ formik.values.city }
                        errror={ formik.errors.city }
                    />
                    <Form.Input
                        title="state"
                        name="state"
                        type="text"
                        label={ t('accountAddressFormState') }
                        placeholder={ t('accountAddressFormState') }
                        onChange={ formik.handleChange }
                        value={ formik.values.state }
                        errror={ formik.errors.state }
                    />
                </Form.Group>
                <Form.Group widths="equal">
                    <Form.Input
                        title="zipCode"
                        name="zipCode"
                        type="text"
                        label={ t('accountAddressFormZipCode') }
                        placeholder={ t('accountAddressFormZipCode') }
                        onChange={ formik.handleChange }
                        value={ formik.values.zipCode }
                        errror={ formik.errors.zipCode }
                    />
                    <Form.Input
                        title="phone"
                        name="phone"
                        type="text"
                        label={ t('accountAddressFormPhone') }
                        placeholder={ t('accountAddressFormPhone') }
                        onChange={ formik.handleChange }
                        value={ formik.values.phone }
                        errror={ formik.errors.phone }
                    />
                </Form.Group>
                <div className="button-actions">
                    <Button className="submit" type="submit" loading={ loading }>
                        { newAddress
                            ? t('accountAddressFormButtonCreate')
                            : t('accountAddressFormButtonUpdate')
                        }
                    </Button>
                </div>
            </Form>
        </div>

    )
}