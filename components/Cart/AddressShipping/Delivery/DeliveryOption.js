import React, { useState } from 'react';
import { size } from "lodash";
import ListAddress from "../../../Account/ListAddress";
import BasicModal from '../../../Modal/BasicModal';
import AddressForm from '../../../Account/AddressForm';
import ButtonAddAddress from '../../../Account/ListAddress/sections/ButtonAddAddress';

export default function DeliveryOption(props) {
    const {
        t,
        addresses,
        addressActive,
        setAddressActive,
        setReloadAddresses
    } = props;
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");
    const [formModal, setFormModal] = useState(null);

    const openModal = (title, address) => {
        setTitleModal(title);
        setFormModal(<AddressForm
            setReloadAddresses={ setReloadAddresses }
            setShowModal={ setShowModal }
            newAddress={ true }
            address={ null }
        />);
        setShowModal(true);
    }

    return (
        <>
            <div className="data">
                <h3>{ t('cartAddressShippingSelectAddress') }</h3>
                <h4>{ t('cartAddressShippingSelect') }</h4>
                { size(addresses) === 0 ? (
                    <>
                        <ButtonAddAddress t={ t } openModal={ openModal } />
                        <h3>{ t('cartAddressShippingNotAddress') }</h3>
                    </>
                ) : (
                    <>
                        <ListAddress
                            addresses={ addresses }
                            selectEnable={ true }
                            idSelected={ addressActive }
                            setIdSelected={ setAddressActive }
                            setReloadAddresses={ setReloadAddresses }
                        />
                    </>
                ) }
            </div>
            <BasicModal show={ showModal } setShow={ setShowModal } title={ titleModal }>
                { formModal }
            </BasicModal>
        </>
    )
}