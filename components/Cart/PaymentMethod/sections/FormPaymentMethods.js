import React from "react";
import { useTranslation } from "react-i18next";
import { Form, Radio } from "semantic-ui-react";
import {
    PAYMENT_METHOD_CASH,
    PAYMENT_METHOD_CREDIT_CARD,
    PAYMENT_METHOD_CASH_AND_CARD
} from "../../../../utils/constants";

export default function FormPaymentMethod(props) {
    const { setPaymentMethodSelected, paymentMethodSelected } = props;
    const { t } = useTranslation();

    const FormHeader = () => (
        <Form.Field>
            <h4>{ t('paymentMethodFormHeader') }</h4>
        </Form.Field>
    );

    const Option = ({ label, value }) => (
        <Form.Field>
            <Radio
                label={ label }
                name="radioPaymentMethod"
                value={ value }
                checked={ paymentMethodSelected === value }
                onChange={ () => setPaymentMethodSelected(value) }
            />
        </Form.Field>
    )

    return (
        <div className="payment-method__options">
            <Form>
                <FormHeader />
                <Option
                    label={ t('paymentMethodOptionCash') }
                    value={ PAYMENT_METHOD_CASH }
                />
                <Option
                    label={ t('paymentMethodOptionCreditCard') }
                    value={ PAYMENT_METHOD_CREDIT_CARD }
                />
                <Option
                    label={ t('paymentMethodOptionCashAndCard') }
                    value={ PAYMENT_METHOD_CASH_AND_CARD }
                />
            </Form>
        </div >
    )
}