import React from 'react'
import Link from "next/link";
import { map } from "lodash";
import useWindowSize from "../../hooks/useWindowSize";
import {
    RES_SMALL,
    RES_MEDIUM,
    RES_LARGE,
    RES_XL
} from "../../utils/breakpoint";
import { numToDollar } from "../../utils/util";
import { Card } from "primereact/card";
import { Grid } from "semantic-ui-react";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";



export default function ListProductos(props) {
    const { productos } = props;
    const { width } = useWindowSize();

    const getColumnsRender = () => {
        switch (true) {
            case width > RES_XL:
                return 5;
            case width > RES_LARGE:
                return 4;
            case width > RES_MEDIUM:
                return 3;
            case width > RES_SMALL:
                return 2;
            default:
                return 1;
        }
    }

    return (
        <Grid className="grid-prods">
            <Grid.Row columns={getColumnsRender()}>
                {map(productos, (producto) => (
                    <Producto producto={producto} />
                ))}
            </Grid.Row>
        </Grid>
    )
}

function Producto(props) {
    const { producto } = props;

    const header = (
        <>
            <Link href={`/${producto.url}`}>
                <img alt={producto.title} height="200px" src={producto.poster.url}
                    onError={(e) => e.target.src = 'https://www.primefaces.org/wp-content/uploads/2020/05/placeholder.png'} />
            </Link>
            {producto.discount && (
                <div className="p-discount">
                    <p>-{producto.discount}% - <span>{numToDollar(producto.price)}</span></p>
                </div>
            )}
        </>
    );

    const footer = (
       <div></div>
    )

    return (

        <Card title={producto.title} href={`/${producto.url}`}
            subTitle={producto.discount ? (
                <>
                    <h3>
                        {numToDollar((producto.price - Math.floor(producto.price * producto.discount) / 100).toFixed(2))}
                    </h3>

                </>
            ) : (
                <h3>{numToDollar(producto.price)}</h3>
            )}
            style={{ width: '20em', margin: '14px' }}
            footer={footer}
            header={header}>
           
        </Card>

    )
}