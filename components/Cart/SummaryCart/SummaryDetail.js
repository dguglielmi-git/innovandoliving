import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { Confirm } from "semantic-ui-react";
import { Rating } from 'primereact/rating';
import DetailTitle from './sections/DetailTitle';
import DetailUnitPrice from './sections/DetailUnitPrice';
import DetailQuantity from './sections/DetailQuantity';
import DetailCategory from './sections/DetailCategory';
import ProductAction from './sections/ProductAction';
import "../../../locales/i18n";


export default function SummaryDetail(props) {
    const { data, setReloadCart, removeProductCart } = props;
    const { t } = useTranslation();
    const [showDialog, setShowDialog] = useState(false);

    const removeProduct = (product) => {
        removeProductCart(product);
        setReloadCart(true);
        setShowDialog(false);
    }

    return (
        <div className="product-item" key={ data._id }>
            <img src={ `${data.producto.poster.url}` } alt="" />
            <div className="product-detail">
                <DetailTitle title={ data.producto.title } />
                <DetailUnitPrice t={ t } unitPrice={ data.producto.price } />
                <DetailQuantity t={ t } quantity={ data.quantity } />
                <Rating
                    value={ data.producto.ranking }
                    readOnly
                    cancel={ false } />
                <i className="pi pi-tag product-category-icon"></i>
                <DetailCategory category={ data.producto.platform.title } />
            </div>
            <ProductAction
                t={ t }
                price={ data.producto.price }
                quantity={ data.quantity }
                setShowDialog={ setShowDialog }
            />
            <Confirm
                size="mini"
                open={ showDialog }
                onCancel={ () => setShowDialog(false) }
                onConfirm={ () => removeProduct(data.id) }
                content={ t('summaryDetailAskForRemovalConfirmation') }
            />
        </div>
    )
}