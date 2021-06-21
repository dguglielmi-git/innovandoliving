import React, { useState, useEffect } from 'react';
import { Button, Icon } from "semantic-ui-react";
import { getAddressesApi } from "../../../api/address";
import { useTranslation } from "react-i18next";
import useAuth from "../../../hooks/useAuth";
import DeliveryOption from "./Delivery/DeliveryOption";
import DeliveryExternal from "./Delivery/DeliveryExternal";
import RadioForm from "./RadioForm";
import "../../../locales/i18n";

export default function AddressShipping(props) {
    const { address, setAddress, setStep } = props;
    const { t } = useTranslation();
    const [addresses, setAddresses] = useState(null);
    const [deliveryOption, setDeliveryOption] = useState('store');
    const [reloadAddresses, setReloadAddresses] = useState(false);
    const { auth, logout } = useAuth();

    useEffect(() => {
        (async () => {
            const response = await getAddressesApi(auth.idUser, logout);
            setAddresses(response || []);
        })()
    }, [reloadAddresses]);


    const RadioOptions = () => (
        <div className="address-shipping__radio-form">
            <RadioForm
                deliveryOption={deliveryOption}
                setDeliveryOption={setDeliveryOption}
                t={t}
            />
        </div>
    );

    const DeliveryForm = () => (
        <DeliveryOption
            t={t}
            addresses={addresses}
            addressActive={address}
            setAddressActive={setAddress}
            setReloadAddresses={setReloadAddresses}
        />
    );

    const ButtonContinue = () => (
        <div className="button-box">
            <Button className="button-box__continue" onClick={() => setStep(1)}>
                {t('cartAddressShippingSelectPayment')} <Icon name="arrow right" />
            </Button>
        </div>
    );

    return (
        <div className="address-shipping">
            <RadioOptions />
            {deliveryOption === 'delivery'          && <DeliveryForm />}
            {deliveryOption === 'deliveryExternal'  && <DeliveryExternal setStep={setStep}/>}
            {deliveryOption !== 'deliveryExternal'  && <ButtonContinue onClick={() => setStep(2)} />}
        </div>
    )
}
