import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ListAddress from "../../ListAddress";

export default function Addresses(props) {
    const { addresses } = props;
    const [reloadAddresses, setReloadAddresses] = useState(false);
    const { t } = useTranslation();

    return (
        <div className="account__addresses">
            <div className="title">
                { t('accountAddressTitle') }
            </div>
            <div className="data">
                <ListAddress
                    addresses={ addresses }
                    reloadAddresses={ reloadAddresses }
                    setReloadAddresses={ setReloadAddresses }
                />
            </div>
        </div>
    )
}
