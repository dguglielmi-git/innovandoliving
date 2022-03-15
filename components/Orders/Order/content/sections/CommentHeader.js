import React from "react";
import { useTranslation } from "react-i18next";

export default function CommentHeader(props) {
    const { order } = props;
    const { t } = useTranslation();

    return (
        <div>
            <h3>{
                (order?.status !== 99)
                    ? t('commentsSupportContact')
                    : t('commentsHistory') } </h3>
        </div>
    )
}