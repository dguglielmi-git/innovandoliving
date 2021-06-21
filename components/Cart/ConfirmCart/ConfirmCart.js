import React, { useState, useEffect } from 'react';
import { forEach, map, size } from "lodash";
import { Divider } from 'primereact/divider';
import { Button, Icon, Image, Grid } from "semantic-ui-react";
import { numToDollar } from "../../../utils/util";

export default function ConfirmCart(props) {
    const { t, setStep, products } = props;
    const [totalPrice, setTotalPrice] = useState(0);

    const deliveryPrice = 3200;

    useEffect(() => {
        let price = 0;
        (async () => {
            await forEach(products, (product) => {
                price += product.producto.price * product.quantity;
            });
        })()
        setTotalPrice(price);
    }, [products]);

    const ButtonBack = () => (
        <div className="button-back" onClick={() => setStep(1)}>
            <Icon name='arrow alternate circle left' color="blue" size='big' />
            <h6>Volver a Opciones de Entrega</h6>
        </div>
    );


    return (
        <div className="confirm-cart">
            <ButtonBack />
            <div className="final-detail-title">
                <h3>Detalle Final de la compra</h3>
            </div>
            <div className="final-detail-items">
                <Grid>
                    {map(products, (product) => (
                        <>
                            <Grid.Column computer={12}>
                                <div>
                                    <h5>{product.producto.title}</h5>
                                </div>
                            </Grid.Column>
                            <Grid.Column computer={4} className="price">
                                <h5>{numToDollar(product.producto.price * product.quantity)}</h5>
                            </Grid.Column>
                        </>
                    ))}
                </Grid>
            </div>
            <div className="final-detail-total">
                <Grid>
                    <Grid.Column computer={10}>
                    </Grid.Column>
                    <Grid.Column computer={6}>
                        <h5 className="delivery-cost">Costo de Envio: {numToDollar(deliveryPrice)}</h5>
                        <h5>Total con Envio: {numToDollar(deliveryPrice + totalPrice)}</h5>
                    </Grid.Column>
                </Grid>
            </div>
            <Divider align="center" />
            <div className="button-submit">
                <Button className="submit" onClick={() =>setStep(3)}>
                    Continuar <Icon name="arrow right" />
                </Button>
            </div>
        </div>
    )
}