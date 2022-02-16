import React, { useState, useEffect } from "react";
import { map, size } from "lodash";
import SummaryDetail from "../SummaryDetail";
import { useTranslation } from "react-i18next";
import BasicLoading from "../../../BasicLoading/BasicLoading";

export default function ProductsListOnCart(props) {
    const {
        products,
        setReloadCart,
        removeProductCart } = props;
    const [loading, setLoading] = useState(true);
    const { t } = useTranslation();

    useEffect(() => {
        if (products) setLoading(false);
    }, [products]);

    const EmptyCart = () => (
        <div className="empty-cart">
            { loading && <h5>{ <BasicLoading label={ t('cartSummaryLoadingCart') } /> }</h5> }
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
                { (size(products) === 0) && <EmptyCart /> }
            </div>
        </div>
    )
}