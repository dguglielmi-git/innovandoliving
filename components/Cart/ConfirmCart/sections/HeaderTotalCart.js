import React from "react";
import { useTranslation } from "react-i18next";

export default function HeaderTotalCart() {
    const { t } = useTranslation();

    return (
        <div className="final-detail-title">
            <h3>{ t('confirmCartDetailEndOfPurchaseTitle') }</h3>
        </div>
    )
}