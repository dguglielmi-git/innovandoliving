import React, { useState, useEffect } from 'react';
import { forEach, map, size } from "lodash";
import { Divider } from 'primereact/divider';
import { Button, Icon, Image, Grid } from "semantic-ui-react";
import { numToDollar } from "../../../utils/util";

export default function ConfirmCart(props) {
    const { t, setStep, products, deliveryOption, shippingPrice, setShippingPrice } = props;
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        /**
         * TO DO: shipping prices must be retrieved from database, instead of the following hardcoded values.
         */
        switch (deliveryOption) {
            case 'delivery':
                setShippingPrice(2100);
                break;
            case 'deliveryExternal':
                setShippingPrice(3200);
                break;
            default:
                setShippingPrice(0);
        }
    }, []);

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
        <div className="button-back" onClick={ () => setStep(1) }>
            <Icon name='arrow alternate circle left' color="blue" size='big' />
            <h6>Volver a Opciones de Entrega</h6>
        </div>
    );

    const processPayment = () => {
        setStep(3);
    }


    return (
        <div className="confirm-cart">
            <ButtonBack />
            <div className="final-detail-title">
                <h3>Detalle Final de la compra</h3>
            </div>
            <div className="final-detail-items">
                <Grid>
                    { map(products, (product) => (
                        <>
                            <Grid.Column computer={ 12 }>
                                <div>
                                    <h5>{ product.producto.title }</h5>
                                </div>
                            </Grid.Column>
                            <Grid.Column computer={ 4 } className="price">
                                <h5>{ numToDollar(product.producto.price * product.quantity) }</h5>
                            </Grid.Column>
                        </>
                    )) }
                </Grid>
            </div>
            <div className="final-detail-total">
                <Grid>
                    <Grid.Column computer={ 10 }>
                    </Grid.Column>
                    <Grid.Column computer={ 6 }>
                        { (deliveryOption === 'store') &&
                            <h5>Total: { numToDollar(totalPrice) }</h5>
                        }
                        { (deliveryOption !== 'store') &&
                            <>
                                <h5 className="delivery-cost">Costo de Envio: { numToDollar(shippingPrice) }</h5>
                                <h5>Total con Envio: { numToDollar(shippingPrice + totalPrice) }</h5>
                            </> }
                    </Grid.Column>
                </Grid>
            </div>
            <Divider align="center" />
            <div className="button-submit">
                <Button className="submit" onClick={ () => processPayment() }>
                    Continuar <Icon name="arrow right" />
                </Button>
            </div>
        </div>
    )
}