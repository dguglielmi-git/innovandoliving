import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
    USER_OWNER,
    ORDER_CLOSED,
} from "../../../../../utils/constants";
import ComboStatus from "./ComboStatus";
import ModalPaymentReceived from "./ModalPayRec";
import ShowButtonUpdate from "./ShowButtonUpdate";
import { updatePendingBalance } from "../../../../../api/order";
import UpdateModal from "../../../../Modal/UpdateModal/UpdateModal";

export default function OptionsOrderStatus(props) {
    const {
        userType,
        open,
        order,
        setReloadOrder,
        dimmer,
        options,
        statusValue,
        orderBlocked,
        openModal,
        closeModal,
        handleCancel,
        handleUpdate,
        handleChange
    } = props;
    const { t } = useTranslation();
    const [showModalPayRec, setShowModalPayRec] = useState(false);

    const markAsPaid = async (cash, other) => {
        await updatePendingBalance(order, cash, other);
        setReloadOrder(true);
    }

    return (
        ((userType == USER_OWNER) & (order?.status !== ORDER_CLOSED)) ?
            <div className="order-detail__mainbox-orderstatus-update">
                <ModalPaymentReceived
                    order={ order }
                    open={ showModalPayRec }
                    markAsPaid={ markAsPaid }
                    setOpen={ setShowModalPayRec }
                />

                <ShowButtonUpdate
                    order={ order }
                    openModal={ openModal }
                    orderBlocked={ orderBlocked }
                    setShowModal={ setShowModalPayRec }
                />

                <UpdateModal
                    size="tiny"
                    open={ open }
                    dimmer={ dimmer }
                    closeModal={ closeModal }
                    handleCancel={ handleCancel }
                    handleUpdate={ handleUpdate }
                    header={ t('modalProgressOrderHeader') }
                    cancelBtnLabel={ t('modalProgressOrderCancelButton') }
                    updateBtnLabel={ t('modalProgressOrderUpdateButton') }
                >
                    { t('modalProgressOrderChildrenLabel') }
                    <ComboStatus
                        options={ options }
                        handleChange={ handleChange }
                        statusValue={ statusValue }
                    />
                </UpdateModal>
            </div>
            : <div></div>
    )
}