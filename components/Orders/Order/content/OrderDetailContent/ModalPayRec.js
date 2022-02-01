import React from 'react'
import { Button, Header, Icon, Modal } from 'semantic-ui-react'
import { useTranslation } from 'react-i18next';

export default function ModalPaymentReceived(props) {
    const { markAsPaid, open, setOpen } = props;
    const { t } = useTranslation();

    const closeModal = () => {
        markAsPaid();
        setOpen(false);
    }

    return (
        <Modal
            closeIcon
            open={ open }
            onClose={ () => setOpen(false) }
            onOpen={ () => setOpen(true) }
        >
            <Header icon='archive' content={ t('modalPayRecHeader') } />
            <Modal.Content>
                <p> { t('modalPayRecContent') } </p>
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
