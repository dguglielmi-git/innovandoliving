import React from "react";
import { Grid } from "semantic-ui-react";
import { DELIVERY_OPTION_STORE } from "../../../../utils/constants";
import { numToDollar } from "../../../../utils/util";

export default function FooterTotalCart(props) {
  const { t, deliveryOption, totalPrice, shippingPrice } = props;

  return (
    <div className="final-detail-total">
      <Grid>
        <Grid.Column computer={10}></Grid.Column>
        <Grid.Column computer={6}>
          {deliveryOption === DELIVERY_OPTION_STORE && (
            <h5>
              {t("confirmCartDetailTotalLabel")} {numToDollar(totalPrice)}
            </h5>
          )}
          {deliveryOption !== DELIVERY_OPTION_STORE && (
            <>
              <h5 className="delivery-cost">
                {t("confirmCartDetailShippingCost")}{" "}
                {numToDollar(shippingPrice)}
              </h5>
              <h5>
                {shippingPrice == 0
                  ? t("confirmCartDetailTotalLabel") +
                    numToDollar(shippingPrice + totalPrice)
                  : t("confirmCartDetailTotalWithShipment") +
                    numToDollar(shippingPrice + totalPrice)}
              </h5>
            </>
          )}
        </Grid.Column>
      </Grid>
    </div>
  );
}
