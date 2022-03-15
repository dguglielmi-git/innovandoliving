import React from "react";

export default function AddressCardBody(props) {
    const { t, address } = props;

    return (
        <div className="card-body">
            <div>{ address.address } - { address.city }</div>
            <div>{ address.state } { address.zipCode }</div>
            <div>{ t('accountListAddressPhoneLabel') } { address.phone }</div>
        </div>
    )
}