import React from "react";
import { useTranslation } from "react-i18next";

export default function SubtitleSummaryCart() {
    const { t } = useTranslation();

    return (
        <div className="subtitle">
            <h4>{ t('cartSummaryCartOrderDetail') }</h4>
        </div>
    )
}