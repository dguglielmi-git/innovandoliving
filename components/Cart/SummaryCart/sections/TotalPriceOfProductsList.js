import React from "react";
import Typography from "@material-ui/core/Typography";
import { numToDollar } from "../../../../utils/util";
import { useTranslation } from "react-i18next";

export default function TotalPriceOfProductsList(props) {
    const { totalPrice } = props;
    const { t } = useTranslation();

    return (
        <div className="total-cart">
            <Typography variant="h5">
                <strong>{ t('cartSummaryCartTotalCart') }</strong>
                { numToDollar(totalPrice) }
            </Typography>
        </div>
    )
}