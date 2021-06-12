import React, { useState, useEffect } from 'react';
import { forEach, map } from "lodash";
import { Image, Icon } from "semantic-ui-react";
import Typography from "@material-ui/core/Typography";
import useCart from "../../../hooks/useCart";
import { numToDollar } from "../../../utils/util";
import { useTranslation } from "react-i18next";
import "../../../locales/i18n";

export default function SummaryCart(props) {
    const { products, reloadCart, setReloadCart, setStep } = props;
    const { t } = useTranslation();
    const [totalPrice, setTotalPrice] = useState(0);
    const { removeProductCart } = useCart();

    useEffect(() => {
        let price = 0;
        (async () => {
            await forEach(products, (product) => {
                price += product.producto.price * product.quantity;
            });
        })()
        setTotalPrice(price);
    }, [products]);

    const removeProduct = (product) => {
        removeProductCart(product);
        setReloadCart(true);
    }
    return (
        <div className="summary-cart">
            <div className="title">
                {t('cartSummaryCartTitle')}
            </div>
            <div className="subtitle">
                <h4>{t('cartSummaryCartOrderDetail')}</h4>
            </div>
            <div className="data">
                {map(products, (product) => (
                    <div className="data__products" key={product._id}>
                        <div className="prod-img">
                            <Image src={product.producto.poster.url} alt="" size="tiny" />
                        </div>
                        <div className="prod-detail">
                            <Typography variant="h6">
                                {product.producto.title}
                            </Typography>
                            <Typography variant="caption">
                                <strong>{t('cartSummaryCartUnitPrice')}</strong>
                                {numToDollar(product.producto.price)}
                            </Typography>
                            <Typography variant="caption">
                                <strong>{t('cartSummaryCartQuantity')}</strong>
                                {product.quantity}
                            </Typography>
                            <div className="options" onClick={() => removeProduct(product.id)}>
                                <Typography variant="caption">
                                    <Icon name="remove" />{t('cartSummaryCartDelete')}
                                </Typography>
                            </div>
                        </div>
                        <div className="prod-final">
                            <div className="price">
                                <Typography variant="h6">
                                    {numToDollar(product.producto.price * product.quantity)}
                                </Typography>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="total-cart">
                <Typography variant="h5"><strong>{t('cartSummaryCartTotalCart')}</strong>
                    {numToDollar(totalPrice)}</Typography>
            </div>
            <div className="button-box">
                <div className="button-box__continue" onClick={() => setStep(1)}>
                    <h4>{t('cartSummaryCartContinuePurchase')}</h4>
                </div>
            </div>
        </div>
    )
}