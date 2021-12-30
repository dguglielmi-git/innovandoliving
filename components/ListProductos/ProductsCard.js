import React from "react";
import { Card } from "primereact/card";
import { numToDollar } from "../../utils/util";
import HeaderProducts from "./HeaderProducts";

export default function ProductsCard(props) {
    const { producto } = props;

    const footer = (
        <div></div>
    )

    return (
        <Card title={ producto.title } href={ `/${producto.url}` }
            subTitle={ producto.discount ? (
                <h3>
                    { numToDollar((producto.price - Math.floor(producto.price * producto.discount) / 100).toFixed(2)) }
                </h3>
            ) : (
                <h3>{ numToDollar(producto.price) }</h3>
            ) }
            style={ { width: '20em', margin: '14px' } }
            header={ <HeaderProducts producto={ producto } /> }
            footer={ footer }
        >
        </Card>

    )
}