import React from "react";
import { Icon } from "semantic-ui-react";

export default function ButtonBack(props) {
    const { setStep, stepLabel, buttonLabel } = props;

    return (
        <div className="button-back" onClick={ () => setStep(stepLabel) }>
            <Icon
                name='arrow alternate circle left'
                color="blue"
                size='big' />
            <h6>{ buttonLabel }</h6>
        </div>
    )
}