import React from "react";
import { map, size } from "lodash";
import SummaryDetail from "../SummaryDetail";
import { useTranslation } from "react-i18next";

export default function ProductsListOnCart(props) {
    const {
        loading,
        products,
        setReloadCart,
        removeProductCart } = props;

    const { t } = useTranslation();

    const EmptyCart = () => (
        <div className="empty-cart">
            { loading && <h5>{ t('cartSummaryLoadingCart') }</h5> }
            { !loading && <h5>{ t('cartSummaryEmptyCart') }</h5> }
        </div>
    )

    return (
        <div className="datascroller-cart">
            <div className="card">
                { map(products, (data) => (
                    <SummaryDetail
                        data={ data }
                        setReloadCart={ setReloadCart }
                        removeProductCart={ removeProductCart }
                    />
                )) }
                { size(products) === 0 && <EmptyCart /> }
            </div>
        </div>
    )
}