import React, { useState } from 'react';
import { Icon, Confirm } from "semantic-ui-react";
import { toast } from "react-toastify";
import { deleteAddressApi } from "../../../api/address";
import AddressCardHeader from './sections/AddressCardHeader';
import AddressCardBody from './sections/AddressCardBody';

export default function Address(props) {
    const {
        selectEnable,
        address,
        logout,
        setReloadAddresses,
        openModal,
        idSelected,
        setIdSelected,
        t
    } = props;

    const [showDialog, setShowDialog] = useState(false);
    const [loadingDelete, setLoadingDelete] = useState(false);

    const openDelete = () => setShowDialog(true);
    const cancelDelete = () => setShowDialog(false);

    const handleClick = () => {
        if (selectEnable) {
            setIdSelected(address.id);
        }
    }

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



    return (
        <>
            <div className="box-address" onClick={ () => handleClick() }>
                <div className={ idSelected === address.id ? "card active" : "card" }>
                    <AddressCardHeader
                        t={ t }
                        address={ address }
                        loadingDelete={ loadingDelete }
                        openDelete={ openDelete }
                        openModal={ openModal }
                    />
                    <AddressCardBody
                        t={ t }
                        address={ address }
                    />
                </div>
            </div>

            <Confirm
                size="mini"
                open={ showDialog }
                onCancel={ cancelDelete }
                onConfirm={ () => deleteAddress() }
                content={ t('accountListAddressQuestionDelete') }
            />
        </>
    )
}
