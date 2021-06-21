import React, { useState } from 'react';
import { useTranslation } from "react-i18next";
import { Confirm } from "semantic-ui-react";
import { numToDollar } from "../../../utils/util";
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
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

    const DetailTitle = ({ title }) => (<div className="product-name">{title}</div>);

    const DetailUnitPrice = ({ unitPrice }) => (
        <div className="product-description">{t('cartSummaryCartUnitPrice')} {` `}
            {numToDollar(unitPrice)}
        </div>
    );

    const DetailQuantity = ({ quantity }) => (
        <div className="product-description">
            {t('cartSummaryCartQuantity')} {` `} {quantity} </div>
    );

    const DetailCategory = ({ category }) => (
        <span className="product-category">{category}</span>
    )

    const ProductAction = ({ price, quantity }) => (
        <div className="product-action">
            <span className="product-price">{numToDollar(price * quantity)}</span>
            <Button icon="pi pi-trash" label="Quitar del Carrito"
                onClick={() => setShowDialog(true)}></Button>
        </div>
    );
    return (
        <div className="product-item" key={data._id}>
            <img src={`${data.producto.poster.url}`} alt="" />
            <div className="product-detail">
                <DetailTitle title={data.producto.title} />
                <DetailUnitPrice unitPrice={data.producto.price} />
                <DetailQuantity quantity={data.quantity} />
                <Rating value={data.producto.ranking} readOnly cancel={false}></Rating>
                <i className="pi pi-tag product-category-icon"></i>
                <DetailCategory category={data.producto.platform.title} />
            </div>
            <ProductAction price={data.producto.price} quantity={data.quantity} />
            <Confirm size="mini" open={showDialog} onCancel={() => setShowDialog(false)}
                onConfirm={() => removeProduct(data.id)}
                content="Desea quitar el producto del carrito?"
            />
        </div>
    )
}