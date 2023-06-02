import React from 'react'
import { map } from "lodash";
import useWindowSize from "../../hooks/useWindowSize";
import { getColumnsRender } from "../../utils/util";
import { Grid } from "semantic-ui-react";
import ProductsCard from './ProductsCard';
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";

export default function ListProductos(props) {
    const { productos } = props;
    const { width } = useWindowSize();

    return (
        <Grid className="grid-prods">
            <Grid.Row columns={ getColumnsRender(width) }>
                { map(productos, (producto) => (
                    <ProductsCard key={ producto._id } producto={ producto } />
                )) }
            </Grid.Row>
        </Grid>
    )
}