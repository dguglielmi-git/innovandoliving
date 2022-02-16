import React, { useState, useReducer, useEffect } from "react";
import { Timeline } from 'primereact/timeline';
import { useTranslation } from "react-i18next";
import { getOrderStatuses, updateOrderStatus } from "../../../../../api/order";
import { progressOrderReducer } from "../../../../../utils/reducer";
import { drawTimeLineOfOrder } from "../../../../../utils/util";
import OptionsOrderStatus from "./OptionsOrderStatus"

export default function ProgressOrder(props) {
    const {
        order,
        userType,
        setReloadOrder,
        orderBlocked,
        setOrderBlocked } = props;
    const [options, setOptions] = useState([]);
    const [statusValue, setStatusValue] = useState(-1);
    const [historyStatus, setHistoryStatus] = useState([]);
    const { t } = useTranslation();

    useEffect(async () => {
        setHistoryStatus(order.status_history);
        const statuses = await getOrderStatuses();
        setOptions(statuses);
        setStatusValue(order.status);
    }, [order]);

    const [state, dispatch] = useReducer(progressOrderReducer, {
        open: false,
        dimmer: undefined,
    })
    const { open, dimmer } = state

    const openModal = () => dispatch({ type: 'OPEN_MODAL', dimmer: 'blurring' })

    const closeModal = () => dispatch({ type: 'CLOSE_MODAL' });

    const handleChange = async (e, { value }) => setStatusValue(value)

    const handleCancel = () => closeModal();

    const handleUpdate = async () => {
        const history = await updateOrderStatus(order, statusValue);
        setHistoryStatus(history.status_history);
        setReloadOrder(true);
        if (statusValue == 99 || statusValue == 12) setOrderBlocked(true);
        closeModal();
    }

    return (
        <div className="order-detail__mainbox-orderstatus">
            <h5>{ t('progressOrderTitle') }</h5>
            <OptionsOrderStatus
                userType={ userType }
                open={ open }
                order={ order }
                setReloadOrder={ setReloadOrder }
                dimmer={ dimmer }
                options={ options }
                statusValue={ statusValue }
                orderBlocked={ orderBlocked }
                openModal={ openModal }
                closeModal={ closeModal }
                handleCancel={ handleCancel }
                handleUpdate={ handleUpdate }
                handleChange={ handleChange }
            />
            <div className="order-detail__mainbox-timeline">
                <Timeline
                    value={ drawTimeLineOfOrder(historyStatus) }
                    content={ (item) => item.status } />
            </div>
        </div>
    )
}