import React from "react";
import { Button, Icon } from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import { USER_OWNER, ORDER_CLOSED } from "../../../../../utils/constants";
import UpdateModal from "../../../../Modal/UpdateModal/UpdateModal";
import ComboStatus from "./ComboStatus";

export default function OptionsOrderStatus(props) {
    const {
        userType,
        open,
        order,
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

    return (
        ((userType == USER_OWNER) & (order?.status !== ORDER_CLOSED)) ?
            <div className="order-detail__mainbox-orderstatus-update">
                <Button color="green" size="tiny" disabled={ orderBlocked }
                    onClick={ () => openModal() }>
                    <Icon name="edit" />{ t('orderUpdateStatus') }
                </Button>

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