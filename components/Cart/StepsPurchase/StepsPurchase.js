import React from 'react';
import { Steps } from 'primereact/steps';
import i18n from "../../../locales/i18n";

const StepsPurchase = (props) => {
    const { activeIndex } = props

    const items = [
        {
            label: i18n.t('stepPurchaseCheckingProducts')
        },
        {
            label: i18n.t('stepPurchaseSelectDeliveryOption')
        },
        {
            label: i18n.t('stepPurchaseSelectConfirmOrder')
        },
        {
            label: i18n.t('stepPurchasePayOrder')
        }
    ];

    return (
        <div className="steps-cart">
            <div className="card">
                <div className="card-title">
                    <h5>{ i18n.t('stepPurchaseProgressTitle') }</h5>
                </div>
                <Steps activeIndex={ activeIndex } model={ items } />
            </div>
        </div>
    );
}
export default StepsPurchase;