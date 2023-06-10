import React from "react";
import { map } from "lodash";
import { Grid } from "semantic-ui-react";
import { getDiscountPrice, numToDollar } from "../../../../utils/util";

export default function ListItemsCart(props) {
  const { products } = props;

  return (
    <div className="final-detail-items">
      <Grid>
        {map(products, (product, index) => (
          <React.Fragment key={index}>
            <Grid.Column computer={12}>
              <div>
                <h5>{product.producto.title}</h5>
              </div>
            </Grid.Column>
            <Grid.Column computer={4} className="price">
              <h5>
                {product.producto.discount
                  ? numToDollar(
                      parseFloat(
                        getDiscountPrice(
                          parseFloat(product.producto?.price?.$numberDecimal),
                          product.producto.discount
                        )
                      ) * parseFloat(product.quantity)
                    )
                  : numToDollar(
                      parseFloat(product.producto?.price?.$numberDecimal) *
                        parseFloat(product.quantity)
                    )}
              </h5>
            </Grid.Column>
          </React.Fragment>
        ))}
      </Grid>
    </div>
  );
}
