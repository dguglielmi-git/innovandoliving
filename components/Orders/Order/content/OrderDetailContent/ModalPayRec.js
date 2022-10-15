import React, { useRef } from 'react'
import { Button, Form, Header, Icon, Modal, Checkbox } from 'semantic-ui-react'
import { useTranslation } from 'react-i18next';
import { numToDollar } from '../../../../../utils/util';

export default function ModalPaymentReceived(props) {
    const { order, markAsPaid, open, setOpen } = props;
    const chkCash = useRef();
    const chkOther = useRef();
    const { t } = useTranslation();

    const closeModal = () => {
        markAsPaid(
            chkCash.current.state.checked,
            chkOther.current.state.checked
        );
        setOpen(false);
    }

    const showLabel = (pending) => (parseFloat(pending) === 0);

    return (
        <Modal
            closeIcon
            open={ open }
            onClose={ () => setOpen(false) }
            onOpen={ () => setOpen(true) }
        >
            <Header icon='archive' content={ t('modalPayRecHeader') } />
            <Modal.Content>
                <p className="p-red"> { t('modalPayRecContent') } </p>
                <div className="modal-paymentreceived__form">
                    <Form>
                        <Form.Field>
                            <Checkbox
                                label={ `Outstanding balance in Cash: ${numToDollar(order.cashPending?.$numberDecimal)}` }
                                ref={ chkCash }
                                disabled={ showLabel(order.cashPending.$numberDecimal) }
                            />
                        </Form.Field>
                        <Form.Field>
                            <Checkbox
                                label={ `Outstanding Balance other payment method: ${numToDollar(order.creditPending?.$numberDecimal)}` }
                                ref={ chkOther }
                                disabled={ showLabel(order.creditPending?.$numberDecimal) }
                            />
                        </Form.Field>
                    </Form>
                </div>
                <p className="p-red">{ t('modalPayRecContentSecond') }</p>
            </Modal.Content>
            <Modal.Actions>
                <Button color='red' onClick={ () => setOpen(false) }>
                    <Icon name='remove' /> { t('modalPayCancelButton') }
                </Button>
                <Button color='green' onClick={ () => closeModal() }>
                    <Icon name='checkmark' /> { t('modalPayConfirmButton') }
                </Button>
            </Modal.Actions>
        </Modal>
    )
}
