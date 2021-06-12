import React, { useState, useEffect } from "react";
import { map, size } from "lodash";
import { toast } from "react-toastify";
import { Button, Icon, Grid, Confirm } from "semantic-ui-react";
import { getAddressesApi, deleteAddressApi } from "../../../api/address";
import useAuth from "../../../hooks/useAuth";
import useWindowSize from "../../../hooks/useWindowSize";
import { useTranslation } from "react-i18next";
import { RES_SMALL } from "../../../utils/breakpoint";
import AddressForm from "../AddressForm";
import BasicModal from "../../Modal/BasicModal";
import "../../../locales/i18n";

export default function ListAddress(props) {
    const { selectEnable, idSelected, setIdSelected, reloadAddresses, setReloadAddresses } = props;
    const { t } = useTranslation();
    const [addresses, setAddresses] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState("");
    const [formModal, setFormModal] = useState(null);

    const { auth, logout } = useAuth();

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

    useEffect(() => {
        (async () => {
            const response = await getAddressesApi(auth.idUser, logout);
            setAddresses(response || []);
            setReloadAddresses(false);
        })()
    }, [reloadAddresses]);


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

function Address(props) {
    const {
        selectEnable,
        address,
        logout,
        setReloadAddresses,
        openModal,
        idSelected,
        setIdSelected
    } = props;
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [showDialog, setShowDialog] = useState(false);
    const { width } = useWindowSize();

    const cardSize = () => {
        return width < RES_SMALL ? { width: '21rem' } : { width: '30rem' };
    }

    const openDelete = () => setShowDialog(true);
    const cancelDelete = () => setShowDialog(false);

    const deleteAddress = async () => {
        setLoadingDelete(true);
        const response = await deleteAddressApi(address.id, logout);
        if (response) {
            setReloadAddresses(true);
            toast.success(t('accountListAddressOkDelete'));
        } else {
            toast.error(t('accountListAddressErrorDelete'));
        }
        setLoadingDelete(false);
        setShowDialog(false);
    };

    const getCardClass = () => {
        return (address.id === idSelected) ? "box-address active-box" : "box-address";
    }

    const handleClick = () => {
        if (selectEnable) {
            setIdSelected(address.id);
        }
    }

    return (
        <>
            <div className={getCardClass()} onClick={handleClick}>
                <div className="card" style={cardSize()}>
                    <div className="card-header">
                        <div>
                            {address.title}
                        </div>
                        <div className="card-header__options">
                            <Icon loading={loadingDelete} color="blue" name="trash alternate"
                                onClick={() => openDelete()} />
                            <Icon color="blue" name="edit"
                                onClick={() => openModal(`Editar: ${address.title}`, address)} />
                        </div>
                    </div>
                    <div className="card-body">
                        <div>{address.address} - {address.city}</div>
                        <div>{address.state} {address.postalCode}</div>
                        <div>Tel. {address.phone}</div>
                    </div>
                </div>
            </div>
            <Confirm size="mini" open={showDialog} onCancel={cancelDelete}
                onConfirm={() => deleteAddress()}
                content={t('accountListAddressQuestionDelete')}
            />
        </>
    )
}
