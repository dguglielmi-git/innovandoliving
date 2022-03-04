import React from "react";
import { useTranslation } from "react-i18next";
import Typography from '@material-ui/core/Typography';
import { formatDate, numToDollar, translateStatus } from "../../../../../utils/util";

export default function OrderStatusLabel(props) {
    const { order } = props;
    const { t } = useTranslation();

    const statusLabel = (caption, value) => (
        <div>
            <Typography variant="caption" display="block">
                <strong>{ caption }</strong> { value }
            </Typography>
        </div>
    )

    return (
        <div className="order-detail__mainbox-title">
            { statusLabel(t('orderDetailTicketNumberLabel'), order && order.mercadoPagoMerchantOrderId) }
            { statusLabel(t('orderDetailOrderDateLabel'), order && formatDate(order.dateCreated)) }
            { statusLabel(t('orderDetailStatusLabel'), order && translateStatus(order.status)) }
            { statusLabel(t('orderDetailPendingPayment'), order && numToDollar(order.purchaseTotalPendingPayment.$numberDecimal)) }
        </div>
    )
}