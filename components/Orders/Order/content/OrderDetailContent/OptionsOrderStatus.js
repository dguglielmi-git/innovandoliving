import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
    USER_OWNER,
    ORDER_CLOSED,
} from "../../../../../utils/constants";
import ComboStatus from "./ComboStatus";
import ModalPaymentReceived from "./ModalPayRec";
import ShowButtonUpdate from "./ShowButtonUpdate";
import UpdateModal from "../../../../Modal/UpdateModal/UpdateModal";
import { updatePendingBalance } from "../../../../../api/order";

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
                    markAsPaid={ markAsPaid }
                    open={ showModalPayRec }
                    setOpen={ setShowModalPayRec }
                />

                <ShowButtonUpdate
                    order={ order }
                    orderBlocked={ orderBlocked }
                    setShowModal={ setShowModalPayRec }
                    openModal={ openModal }
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
                        handleChange={ handleChange }
                        options={ options }
                        statusValue={ statusValue }
                    />
                </UpdateModal>
            </div>
            : <div></div>
    )
}