import React from 'react';
import { Form, Radio } from 'semantic-ui-react';
import {
    DELIVERY_OPTION_DELIVERY,
    DELIVERY_OPTION_STORE,
    DELIVERY_OPTION_TBD,
    DELIVERY_OPTION_EXTERNAL_PROVIDER
} from "../../../utils/constants";

export default function RadioForm(props) {
    const { deliveryOption, setDeliveryOption, t } = props;

    return (
        <div className="address-shipping__radio-form">
            <Form>
                <Form.Field>
                    <h4>{ t('cartAddressShippingSelectDelivery') }</h4>
                </Form.Field>
                <Form.Field>
                    <Radio
                        label={ t('cartAddressShippingTakeAway') }
                        name='radioGroup'
                        value={ DELIVERY_OPTION_STORE }
                        checked={ deliveryOption === DELIVERY_OPTION_STORE }
                        onChange={ () => setDeliveryOption(DELIVERY_OPTION_STORE) }
                    />
                </Form.Field>
                <Form.Field>
                    <Radio
                        label={ t('cartAddressShippingTBD') }
                        name='radioGroup'
                        value={ DELIVERY_OPTION_TBD }
                        checked={ deliveryOption === DELIVERY_OPTION_TBD }
                        onChange={ () => setDeliveryOption(DELIVERY_OPTION_TBD) }
                    />
                </Form.Field>
                <Form.Field>
                    <Radio
                        label={ t('cartAddressShippingDeliveryHome') }
                        name='radioGroup'
                        value={ DELIVERY_OPTION_DELIVERY }
                        checked={ deliveryOption === DELIVERY_OPTION_DELIVERY }
                        onChange={ () => setDeliveryOption(DELIVERY_OPTION_DELIVERY) }
                    />
                </Form.Field>
                {/* <Form.Field>
                    <Radio
                        label={ t('cartAddressShippingDeliveryExternal') }
                        name='radioGroup'
                        value={DELIVERY_OPTION_EXTERNAL_PROVIDER}
                        checked={ deliveryOption === DELIVERY_OPTION_EXTERNAL_PROVIDER }
                        onChange={ () => setDeliveryOption(DELIVERY_OPTION_EXTERNAL_PROVIDER) }
                    />
                </Form.Field>
                */}
            </Form>
        </div>
    );
}