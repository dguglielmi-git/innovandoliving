import React from "react";
import { Icon } from "semantic-ui-react";
import { useTranslation } from "react-i18next";

export default function ButtonBack(props) {
    const { goBack } = props;
    const { t } = useTranslation();

    return (
        <div
            className="order-detail__mainbox-buttonback"
            onClick={ () => goBack() }>
            <Icon name='arrow alternate circle left' color="blue" size='big' />
            <h6>{ t('orderDetailsBackButton') }</h6>
        </div>
    )
}