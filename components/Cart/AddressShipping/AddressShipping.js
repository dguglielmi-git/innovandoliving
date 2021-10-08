import React, { useState, useEffect } from 'react';
import { Button, Icon } from "semantic-ui-react";
import { getAddressesApi } from "../../../api/address";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import DeliveryOption from "./Delivery/DeliveryOption";
import DeliveryExternal from "./Delivery/DeliveryExternal";
import RadioForm from "./RadioForm";
import "../../../locales/i18n";

export default function AddressShipping(props) {
    const { address, setAddress, setStep, deliveryOption, setDeliveryOption } = props;
    const { t } = useTranslation();
    const { auth, logout } = useAuth();
    const [addresses, setAddresses] = useState(null);
    const [reloadAddresses, setReloadAddresses] = useState(false);

    useEffect(() => {
        (async () => {
            const response = await getAddressesApi(auth.idUser, logout);
            setAddresses(response || []);
        })()
    }, [reloadAddresses]);

    const RadioOptions = () => (
        <div className="address-shipping__radio-form">
            <RadioForm
                deliveryOption={ deliveryOption }
                setDeliveryOption={ setDeliveryOption }
                t={ t }
            />
        </div>
    );

    const handleContinue = () => {
        if (deliveryOption === 'delivery' && address === null) {
            toast.error(t('cartAddressShippingAddressNotSelected'));
        } else {
            setStep(2)
        }
    }

    const DeliveryForm = () => (
        <DeliveryOption
            t={ t }
            addresses={ addresses }
            addressActive={ address }
            setAddressActive={ setAddress }
            setReloadAddresses={ setReloadAddresses }
        />
    );

    const ButtonContinue = () => (
        <div className="button-box">
            <Button className="button-box__continue" onClick={ () => handleContinue() }>
                { t('cartAddressShippingSelectPayment') } <Icon name="arrow right" />
            </Button>
        </div>
    );

    return (
        <div className="address-shipping">
            <RadioOptions />
            { deliveryOption === 'delivery' && <DeliveryForm /> }
            { deliveryOption === 'deliveryExternal' && <DeliveryExternal setStep={ setStep } /> }
            { deliveryOption !== 'deliveryExternal' && <ButtonContinue /> }
        </div>
    )
}