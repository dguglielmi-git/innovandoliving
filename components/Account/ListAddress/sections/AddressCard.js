import React, { useEffect } from "react";
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
    openModal,
  } = props;
  const { t } = useTranslation();
  
  const getClass = ()=> {
    if (!idSelected) return "card"
    return idSelected === address._id ? "card active" : "card"
  }

  return (
    <div className="box-address" onClick={() => handleClick(address._id)}>
      <div className={getClass()}>
        <AddressCardHeader
          t={t}
          address={address}
          loadingDelete={loadingDelete}
          openDelete={openDelete}
          openModal={openModal}
        />
        <AddressCardBody t={t} address={address} />
      </div>
    </div>
  );
}
