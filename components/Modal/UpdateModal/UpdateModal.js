import React from "react";
import { Button, Modal } from "semantic-ui-react";

export default function UpdateModal(props) {

    const {
        size,
        open,
        dimmer,
        closeModal,
        handleCancel,
        handleUpdate,
        header,
        cancelBtnLabel,
        updateBtnLabel,
    } = props;

    return (
        <Modal
            dimmer={ dimmer }
            open={ open }
            onClose={ () => closeModal() }
            size={ size }
        >
            <Modal.Header>{ header }</Modal.Header>
            <Modal.Content>
                { props.children }
            </Modal.Content>
            <Modal.Actions>
                <Button negative onClick={ () => handleCancel() }>
                    { cancelBtnLabel }
                </Button>
                <Button positive onClick={ () => handleUpdate() }>
                    { updateBtnLabel }
                </Button>
            </Modal.Actions>
        </Modal>
    )
}