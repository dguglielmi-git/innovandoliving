import React from "react";
import { useTranslation } from "react-i18next";

export default function EmptyOrders() {
    const { t } = useTranslation();

    return (
        <div className="order-title">
            <h4>{ t('orderTitle') }</h4>
            <p>{ t('orderListEmptyLabel') }</p>
        </div>
    )
}