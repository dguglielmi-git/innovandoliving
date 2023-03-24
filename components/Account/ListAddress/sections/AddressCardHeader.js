import React from "react";
import { Icon } from "semantic-ui-react";

export default function AddressCardHeader(props) {

    const {
        t,
        address,
        loadingDelete,
        openDelete,
        openModal } = props;

    const editButton = () =>
        openModal(`${t('accountListAddressEditLabel')}: ${address.title}`, address);

    return (
        <div className="card-header">
            <div>
                { address.title }
            </div>
            <div className="card-header__options">
                <Icon loading={ loadingDelete } color="blue" name="trash alternate"
                    onClick={ () => openDelete() } />
                <Icon color="blue" name="edit"
                    onClick={ () => editButton() } />
            </div>
        </div>
    )
}