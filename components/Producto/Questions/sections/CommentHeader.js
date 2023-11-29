import React from "react";
import { useTranslation } from 'react-i18next';

export default function CommentsHeader() {
    const {t} = useTranslation()

    return (
        <div className="questions__header">
            <h3>{t('questionsHeader')}</h3>
        </div>
    )
}