import React, { useState } from 'react';
import { Icon, Confirm } from "semantic-ui-react";
import { toast } from "react-toastify";
import { deleteAddressApi } from "../../../api/address";

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

    const handleClick = () => {
        if (selectEnable) {
            setIdSelected(address.id);
        }
    }

    return (
        <>
            <div className="box-address" onClick={() => handleClick()}>
                <div className={idSelected === address.id ? "card active" : "card"}>
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
