import React, { useEffect } from "react";
import { forEach, size } from "lodash";
import useCart from "../../../hooks/useCart";
import { getDiscountPrice } from "../../../utils/util";
import ProductsListOnCart from "./sections/ProductsListOnCart";
import SubtitleSummaryCart from "./sections/SubtitleSummaryCart";
import ContinuePurchaseButton from "./sections/ContinuePurchaseButton";
import TotalPriceOfProductsList from "./sections/TotalPriceOfProductsList";

export default function SummaryCart(props) {
  const {
    products,
    reloadCart,
    setReloadCart,
    setStep,
    totalPrice,
    setTotalPrice,
  } = props;
  const { removeProductCart } = useCart();

  useEffect(() => {
    let price = 0;
    (async () => {
      await forEach(products, (product) => {
        if (product.producto.discount) {
          price +=
            parseFloat(
              getDiscountPrice(
                parseFloat(product.producto?.price?.$numberDecimal),
                product.producto.discount
              )
            ) * parseFloat(product.quantity);
        } else {
          price +=
            parseFloat(product.producto?.price?.$numberDecimal) *
            parseFloat(product.quantity);
        }
      });
    })();
    setTotalPrice(price);
    setReloadCart(false);
  }, [products, reloadCart]);

  return (
    <div className="summary-cart">
      <SubtitleSummaryCart />
      <ProductsListOnCart
        products={products}
        setReloadCart={setReloadCart}
        removeProductCart={removeProductCart}
      />
      <TotalPriceOfProductsList totalPrice={totalPrice} />
      {size(products) > 0 && <ContinuePurchaseButton setStep={setStep} />}
    </div>
  );
}
