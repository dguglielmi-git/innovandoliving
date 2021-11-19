import React from 'react';
import {Form, Radio} from 'semantic-ui-react';

export default function RadioForm(props) {
    const { deliveryOption, setDeliveryOption, t } = props;
    
    return (
        <Form>
            <Form.Field>
                <h4>{t('cartAddressShippingSelectDelivery')}</h4>
            </Form.Field>
            <Form.Field>
                <Radio
                    label={t('cartAddressShippingTakeAway')}
                    name='radioGroup'
                    value='store'
                    checked={deliveryOption === 'store'}
                    onChange={() => setDeliveryOption('store')}
                />
            </Form.Field>
            <Form.Field>
                <Radio
                    label={t('cartAddressShippingDeliveryHome')}
                    name='radioGroup'
                    value='delivery'
                    checked={deliveryOption === 'delivery'}
                    onChange={() => setDeliveryOption('delivery')}
                />
            </Form.Field>
            <Form.Field>
                <Radio
                    label={t('cartAddressShippingDeliveryExternal')}
                    name='radioGroup'
                    value='deliveryExternal'
                    checked={deliveryOption === 'deliveryExternal'}
                    onChange={() => setDeliveryOption('deliveryExternal')}
                />
            </Form.Field>
        </Form>
    );
}