import React, { useState, useEffect } from 'react';
import { size } from "lodash";
import { Form, Radio, Icon } from "semantic-ui-react";
import { getAddressesApi } from "../../../api/address";
import { useTranslation } from "react-i18next";
import useAuth from "../../../hooks/useAuth";
import ListAddress from "../../Account/ListAddress";
import "../../../locales/i18n";

export default function AddressShipping(props) {
    const { setAddress, setStep } = props;
    const { t } = useTranslation();
    const [addresses, setAddresses] = useState(null);
    const [addressActive, setAddressActive] = useState(null);
    const [deliveryOption, setDeliveryOption] = useState('store');
    const [reloadAddresses, setReloadAddresses] = useState(false);
    const { auth, logout } = useAuth();

    useEffect(() => {
        (async () => {
            const response = await getAddressesApi(auth.idUser, logout);
            setAddresses(response || []);
        })()
    }, [reloadAddresses]);

    return (
        <div className="address-shipping">
            <div className="title">{t('cartAddressShippingTitleOptions')}</div>
            <div className="button-back" onClick={() => setStep(0)}>
                <Icon name='arrow alternate circle left' color="blue" size='big' />
                <h6>{t('cartAddressShippingBackToCart')}</h6>
            </div>
            <div className="address-shipping__radio-form">
                <RadioForm
                    deliveryOption={deliveryOption}
                    setDeliveryOption={setDeliveryOption}
                    t={t}/>
            </div>

            {deliveryOption === 'delivery' && (
                <div className="data">
                    <h3>{t('cartAddressShippingSelectAddress')}</h3>
                    {size(addresses) === 0 ? (
                        <h3>{t('cartAddressShippingNotAddress')}</h3>
                    ) : (
                        <>
                            <ListAddress
                                selectEnable={true}
                                idSelected={addressActive}
                                setIdSelected={setAddressActive}
                                reloadAddresses={reloadAddresses}
                                setReloadAddresses={setReloadAddresses}
                            />
                        </>
                    )}
                </div>
            )}
            <div className="button-box">
                <div className="button-box__continue" onClick={() => setStep(1)}>
                    <h4>{t('cartAddressShippingSelectPayment')}</h4>
                </div>
            </div>
        </div>
    )
}

function RadioForm(props) {
    const { deliveryOption, setDeliveryOption,t } = props;
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
        </Form>
    );
}