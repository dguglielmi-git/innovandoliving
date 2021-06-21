import React, { useState } from "react";
import { map, size } from "lodash";
import { Button, Icon, Grid } from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import useAuth from "../../../hooks/useAuth";
import Address from "./Address";
import AddressForm from "../AddressForm";
import BasicModal from "../../Modal/BasicModal";
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
            setReloadAddresses={setReloadAddresses}
            setShowModal={setShowModal}
            newAddress={address ? false : true}
            address={address || null}
        />);
        setShowModal(true);
    }

    return (
        <>
            <div className="address">
                <div className="button-add">
                    <Button onClick={() => openModal(t('accountListAddressNewAddressTitle'))}>
                        <Icon name="address book" /> {t('accountListAddressAddAddress')}
                    </Button>
                </div>
                {size(addresses) === 0 ? (
                    <h3>{t('accountListAddressNotAddress')}</h3>
                ) : (
                    <>
                        <Grid>
                            <div>
                                {map(addresses, (address) => (
                                    <Grid.Column
                                        key={address.id}
                                        mobile={16}
                                        tablet={8}
                                        computer={4}>
                                        <Address
                                            selectEnable={selectEnable}
                                            address={address}
                                            logout={logout}
                                            setReloadAddresses={setReloadAddresses}
                                            openModal={openModal}
                                            idSelected={idSelected}
                                            setIdSelected={setIdSelected}
                                            t={t}
                                        />
                                    </Grid.Column>
                                ))}
                            </div>
                        </Grid>
                    </>
                )}
            </div>
            <BasicModal show={showModal} setShow={setShowModal} title={titleModal}>
                {formModal}
            </BasicModal>
        </>
    )
}
