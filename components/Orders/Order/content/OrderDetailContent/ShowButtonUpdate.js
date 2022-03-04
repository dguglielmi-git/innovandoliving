import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button, Icon } from "semantic-ui-react";
import BasicLoading from "../../../../BasicLoading/BasicLoading";
import { ORDER_PENDING_PAYMENT } from "../../../../../utils/constants";

export default function ShowButtonUpdate(props) {
    const {
        order,
        orderBlocked,
        setShowModal,
        openModal
    } = props;
    const { t } = useTranslation();
    const [status, setStatus] = useState(-1);

    useEffect(() => {
        setStatus(order.status);
    }, [order]);

    const loading = () => (status < 0) ? true : false;

    if (status === ORDER_PENDING_PAYMENT) return (
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

    if (loading()) return <BasicLoading />

    return (
        <Button
            color="green"
            size="tiny"
            disabled={ orderBlocked }
            onClick={ () => openModal() }>
            <Icon name="edit" /> { t('orderUpdateStatus') }
        </Button>
    )

}