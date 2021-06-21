import React, {  useEffect } from 'react';
import { forEach, map, size } from "lodash";
import { Button, Icon } from "semantic-ui-react";
import Typography from "@material-ui/core/Typography";
import useCart from "../../../hooks/useCart";
import { numToDollar } from "../../../utils/util";
import SummaryDetail from "./SummaryDetail";


export default function SummaryCart(props) {
    const { t, products, reloadCart, setReloadCart, setStep, totalPrice, setTotalPrice } = props;
    const { removeProductCart } = useCart();

    useEffect(() => {
        let price = 0;
        (async () => {
            await forEach(products, (product) => {
                price += product.producto.price * product.quantity;
            });
        })()
        setTotalPrice(price);
        setReloadCart(false);
    }, [products, reloadCart]);

    const EmptyCart = () => (
        <div className="empty-cart">
            <h5>El carrito está vacio...</h5>
        </div>
    )

    return (
        <div className="summary-cart">
            <div className="subtitle">
                <h4>{t('cartSummaryCartOrderDetail')}</h4>
            </div>
            <div className="datascroller-cart">
                <div className="card">
                    {map(products, (data) => (
                        <SummaryDetail
                            data={data}
                            setReloadCart={setReloadCart}
                            removeProductCart={removeProductCart}
                        />
                    ))}
                    {size(products) === 0 && <EmptyCart />}
                </div>
            </div>
            <div className="total-cart">
                <Typography variant="h5"><strong>{t('cartSummaryCartTotalCart')}</strong>
                    {numToDollar(totalPrice)}</Typography>
            </div>
            {size(products) > 0 && (
                <div className="button-box">
                    <Button className="button-box__continue" onClick={() => setStep(1)}>
                        {t('cartSummaryCartContinuePurchase')} <Icon name="arrow right" />
                    </Button>
                </div>
            )}
        </div>
    )
}
