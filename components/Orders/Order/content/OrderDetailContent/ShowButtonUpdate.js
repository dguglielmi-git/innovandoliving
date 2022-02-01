import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Icon } from "semantic-ui-react";
import { ORDER_PENDING_PAYMENT } from "../../../../../utils/constants";

export default function ShowButtonUpdate(props) {
    const {
        status,
        orderBlocked,
        setShowModal,
        openModal
    } = props;
    const { t } = useTranslation();

    if (status === ORDER_PENDING_PAYMENT) {
        return (
            <>
                <Button
                    color="red"
                    size="mini"
                    disabled={ orderBlocked }
                    onClick={ () => setShowModal(true) }
                >
                    <Icon name="dollar sign" />
                    { t('optionsOrderStatusButtonLocked') }
                </Button>
                <div className="order-locked">
                    { t('optionsOrderStatusMessageOrderLocked') }
                </div>
            </>
        )
    }

    return (
        <Button color="green" size="tiny" disabled={ orderBlocked }
            onClick={ () => openModal() }>
            <Icon name="edit" />{ t('orderUpdateStatus') }
        </Button>
    )

}