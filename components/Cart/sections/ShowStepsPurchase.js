import { size } from "lodash";
import React from "react";
import StepsPurchase from "../StepsPurchase";

export default function ShowStepsPurchase(props) {
    const { productsData, step } = props;

    if (size(productsData) > 0) return <StepsPurchase activeIndex={ step } />
    return <div />
}