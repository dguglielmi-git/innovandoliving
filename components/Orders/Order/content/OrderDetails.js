import React, { useState, useEffect } from "react";
import { Divider } from "semantic-ui-react";
import OrderStatusLabel from "./OrderDetailContent/OrderStatusLabel";
import ProgressOrder from "./OrderDetailContent/ProgressOrder";
import OrderDetailedTable from "./OrderDetailContent/OrderDetailedTable";
import OrderCommentSection from "./OrderDetailContent/OrderCommentSection";
import ButtonBack from "./OrderDetailContent/ButtonBack";
import { markMessageAsRead } from "../../../../api/orderMessage";
import { verifyUserType } from "../../../../utils/util";
import { useTranslation } from "react-i18next";
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.css';
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export default function OrderDetails(props) {
    const { setShowDetail, order, setReloadOrder, userType } = props;
    const [orderBlocked, setOrderBlocked] = useState(false);
    const { t } = useTranslation();

    useEffect(() => {
        (async () => {
            if (order) {
                await markMessageAsRead(order._id, verifyUserType(userType))
                setReloadOrder(true);
            }
        })()
    }, []);

    const goBack = () => setShowDetail(false);

    return (
        <div className="order-detail__mainbox">
            <ButtonBack goBack={ goBack } />
            <OrderStatusLabel order={ order } />
            <ProgressOrder
                order={ order }
                userType={ userType }
                setReloadOrder={ setReloadOrder }
                orderBlocked={ orderBlocked }
                setOrderBlocked={ setOrderBlocked }
            />
            <OrderDetailedTable order={ order } />
            <Divider section />
            <OrderCommentSection
                order={ order }
                setReloadOrder={ setReloadOrder }
                sendLabel={ t('orderDetailSendCommentLabel') }
                userType={ userType }
                orderBlocked={ orderBlocked }
            />
        </div>
    )
}