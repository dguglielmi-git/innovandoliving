import React from "react";
import { map } from "lodash";
import { Grid } from "semantic-ui-react";
import { numToDollar } from "../../../../utils/util";


export default function ListItemsCart(props) {
    const { products } = props;

    return (
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
                            <h5>{
                                numToDollar(product.producto.price * product.quantity)
                            }</h5>
                        </Grid.Column>
                    </>
                )) }
            </Grid>
        </div>
    )
}