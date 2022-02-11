import React from "react";
import { Card } from "primereact/card";
import { getDiscountPrice, numToDollar } from "../../utils/util";
import HeaderProducts from "./HeaderProducts";

export default function ProductsCard(props) {
    const { producto } = props;

    const footer = (
        <div></div>
    )
    const getPrice = (prod) => {
        if (prod.discount) {
            return getDiscountPrice(prod.price, prod.discount);
        }
        return prod.price;
    }

    return (
        <Card title={ producto.title } href={ `/${producto.url}` }
            subTitle={ (
                <h3>
                    { numToDollar(parseFloat(getPrice(producto))) }
                </h3>
            ) }
            style={ { width: '20em', margin: '14px' } }
            header={ <HeaderProducts producto={ producto } /> }
            footer={ footer }
        >
        </Card>

    )
}