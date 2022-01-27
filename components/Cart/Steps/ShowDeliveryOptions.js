import React from "react";
import { STEP_DELIVERY_OPTIONS } from "../../../utils/constants";
import AddressShipping from "../AddressShipping";

export default function ShowDeliveryOptions(props) {
    const {
        address,
        setAddress,
        step,
        setStep,
        deliveryOption,
        setDeliveryOption
    } = props;

    if (step === STEP_DELIVERY_OPTIONS) {
        return (
            <AddressShipping
                address={ address }
                setAddress={ setAddress }
                setStep={ setStep }
                deliveryOption={ deliveryOption }
                setDeliveryOption={ setDeliveryOption }
            />)
    }

    return <div />
}