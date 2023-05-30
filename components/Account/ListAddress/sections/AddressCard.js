import React from "react";
import AddressCardBody from "./AddressCardBody";
import AddressCardHeader from "./AddressCardHeader";
import { useTranslation } from "react-i18next";

export default function AddressCard(props) {
    const {
        handleClick,
        idSelected,
        address,
        loadingDelete,
        openDelete,
        openModal
    } = props;
    const { t } = useTranslation();

    return (
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
    )
}