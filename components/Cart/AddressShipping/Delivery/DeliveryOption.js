import React from 'react';
import { size } from "lodash";
import ListAddress from "../../../Account/ListAddress";

export default function DeliveryOption(props) {
    const {
        t,
        addresses,
        addressActive,
        setAddressActive,
        setReloadAddresses
    } = props;

    return (
        <>
            <div className="data">
                <h3>{t('cartAddressShippingSelectAddress')}</h3>
                {size(addresses) === 0 ? (
                    <h3>{t('cartAddressShippingNotAddress')}</h3>
                ) : (
                    <>
                        <ListAddress
                            addresses={addresses}
                            selectEnable={true}
                            idSelected={addressActive}
                            setIdSelected={setAddressActive}
                            setReloadAddresses={setReloadAddresses}
                        />
                    </>
                )}
            </div>
        </>
    )
}