import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { Button, Grid, Icon, Input, Label } from "semantic-ui-react";
import { numToDollar } from "../../../utils/util";
import { STEP_FINISH_ORDER } from "../../../utils/constants";

export default function CashAndCard(props) {
    const { setStep, totalAmount, setTotalCash } = props;
    const [cashAmount, setCashAmount] = useState(0);
    const [creditCardAmount, setCreditCardAmount] = useState(0);
    const [error, setError] = useState(true);
    const { t } = useTranslation();

    const handleChangeCash = (e) => {
        if (parseFloat(e) < 0) setCashAmount(parseFloat(0))
        else {
            setCashAmount(parseFloat(e))
        }
        setCreditCardAmount((parseFloat(totalAmount) - parseFloat(e)))
    }

    const handleChangeCreditCard = (e) => {
        if (parseFloat(e) < 0) setCreditCardAmount(parseFloat(0))
        else {
            setCreditCardAmount(parseFloat(e))
        }
        setCashAmount((parseFloat(totalAmount) - parseFloat(e)))
    }

    const verifyQuantity = async () => {
        setError(false)
        let result = true;
        const amount = parseFloat(cashAmount) + parseFloat(creditCardAmount);

        if (amount !== totalAmount) {
            setError(true)
            toast.error(t('cashAndCardAmountNotEqualTotal'))
            result = false;
        } else {
            if (parseFloat(cashAmount) === 0 || parseFloat(creditCardAmount) === 0) {
                toast.error(t('cashAndCardErrorInQuantities'))
                result = false;
                setError(true)
            }
            else if (parseFloat(cashAmount) < 0 || parseFloat(creditCardAmount) < 0) {
                toast.error(t('cashAndCardNegativeValuesInFields'))
                result = false;
                setError(true)
            }
        }
        return result;
    }

    const submit = async () => {
        if (await verifyQuantity() == true) {
            setTotalCash(parseFloat(totalAmount) - parseFloat(creditCardAmount))
            setStep(STEP_FINISH_ORDER)
        }
    }

    useEffect(() => {
        const half = (parseFloat(totalAmount) / 2);
        setCashAmount(half);
        setCreditCardAmount(half);
    }, [])

    return (
        <div className="cashandcard">
            <div className="cashandcard__header">
                <h4>{ t('cashAndCardHeaderLabel') } { numToDollar(totalAmount) }</h4>
            </div>
            <div className="cashandcard__payment">
                <Grid centered>
                    <Grid.Row textAlign="left">
                        <Grid.Column width="3">
                            <Input
                                placeholder={ numToDollar(cashAmount) }
                                onChange={ (e) => handleChangeCash(e.target.value) }
                                value={ cashAmount }
                                error={ error }
                                type="number"
                            />
                        </Grid.Column>
                        <Grid.Column width="4" verticalAlign="middle">
                            <Label>{ t('cashAndCardAmountInCashLabel') }</Label>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row textAlign="justified">
                        <Grid.Column width="3">
                            <Input
                                placeholder={ numToDollar(creditCardAmount) }
                                onChange={ (e) => handleChangeCreditCard(e.target.value) }
                                value={ creditCardAmount }
                                error={ error }
                                type="number"
                            />
                        </Grid.Column>
                        <Grid.Column width="4" verticalAlign="middle">
                            <Label>{ t('cashAndCardAmountInCreditCardLabel') }</Label>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </div>
            <div className="cashandcard__submitcac">
                <Button className="submit" onClick={ () => submit() }>
                    { t('paymentMethodSubmitButtonLabel') }
                    <Icon name="arrow right" />
                </Button>
            </div>
        </div>
    )
}