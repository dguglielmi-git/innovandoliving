import React, { useState } from 'react';
import { Confirm } from "semantic-ui-react";
import { toast } from "react-toastify";
import { deleteAddressApi } from "../../../api/address";
import AddressCard from "./sections/AddressCard";

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

    const handleClick = (addressId) => {
        if (selectEnable) {
            setIdSelected(addressId);
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
            <AddressCard
                handleClick={ handleClick }
                idSelected={ idSelected }
                address={ address }
                loadingDelete={ loadingDelete }
                openDelete={ openDelete }
                openModal={ openModal }
            />

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
