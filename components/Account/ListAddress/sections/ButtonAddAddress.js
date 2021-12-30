import React from "react";
import { Button, Icon } from "semantic-ui-react";

export default function ButtonAddAddress(props) {
    const { t, openModal } = props;

    return (
        <div className="button-add">
            <Button onClick={ () => openModal(t('accountListAddressNewAddressTitle')) }>
                <Icon name="address book" /> { t('accountListAddressAddAddress') }
            </Button>
        </div>
    )
}