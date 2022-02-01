import React, { useState } from "react";
import { size } from "lodash";
import { useTranslation } from "react-i18next";
import AddressForm from "../AddressForm";
import useAuth from "../../../hooks/useAuth";
import BasicModal from "../../Modal/BasicModal";
import ListAddressGrid from "./ListAddressGrid";
import ButtonAddAddress from "./sections/ButtonAddAddress";
import "../../../locales/i18n";

export default function ListAddress(props) {
    const {
        addresses,
        selectEnable,
        idSelected,
        setIdSelected,
        setReloadAddresses
    } = props;
    const { t } = useTranslation();
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");
    const [formModal, setFormModal] = useState(null);

    const { logout } = useAuth();

    const openModal = (title, address) => {
        setTitleModal(title);
        setFormModal(<AddressForm
            setReloadAddresses={ setReloadAddresses }
            setShowModal={ setShowModal }
            newAddress={ address ? false : true }
            address={ address || null }
        />);
        setShowModal(true);
    }

    const ifNotAddresses = () => size(addresses) === 0 ? true : false

    return (
        <>
            <div className="address">
                <ButtonAddAddress t={ t } openModal={ openModal } />
                { ifNotAddresses() ? (
                    <h3>{ t('accountListAddressNotAddress') }</h3>
                ) : (
                    <ListAddressGrid
                        t={ t }
                        addresses={ addresses }
                        selectEnable={ selectEnable }
                        logout={ logout }
                        setReloadAddresses={ setReloadAddresses }
                        openModal={ openModal }
                        idSelected={ idSelected }
                        setIdSelected={ setIdSelected }
                    />
                ) }
            </div>
            <BasicModal show={ showModal } setShow={ setShowModal } title={ titleModal }>
                { formModal }
            </BasicModal>
        </>
    )
}
