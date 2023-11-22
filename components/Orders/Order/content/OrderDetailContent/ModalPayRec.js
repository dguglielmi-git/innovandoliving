import React, { useEffect, useState, useRef } from 'react'
import {
  Button,
  Form,
  Header,
  Icon,
  Modal,
  Checkbox,
  Confirm
} from 'semantic-ui-react'
import { updatePendingPayment } from '../../../../../api/order'
import { useTranslation } from 'react-i18next'
import { numToDollar } from '../../../../../utils/util'
import { toast } from 'react-toastify'

export default function ModalPaymentReceived (props) {
  const { open, order, setOpen, setReloadOrder } = props
  const [amountReceived, setAmountReceived] = useState(0)
  const [amountError, setAmountError] = useState(false)
  const [totalAmountChecked, setTotalAmountChecked] = useState(false)
  const [loadingUpdate, setLoadingUpdate] = useState(false)
  const [openConfirm, setOpenConfirm] = useState(false)
  const chkCash = useRef()
  const { t } = useTranslation()

  const getValuesToUpdate = () => {
    return {
      amountReceived: totalAmountChecked
        ? parseFloat(order.purchaseTotalPendingPayment?.$numberDecimal)
        : parseFloat(amountReceived)
    }
  }

  const updatePayment = async () => {
    setOpenConfirm(false)
    setLoadingUpdate(true)
    try {
      const paymentUpdate = getValuesToUpdate()

      await updatePendingPayment(order, paymentUpdate)
      setReloadOrder(true)
      console.log('requesting reload orders')
      toast.success(t('modalPayUpdatedOk'))
      setOpen(false)
    } catch (error) {
      toast.error(t('modalPayErrorUpdate'))
      console.error(error)
    }

    setLoadingUpdate(false)
  }

  const cancelModal = () => {
    setAmountReceived(0)
    setAmountError(false)
    setOpen(false)
  }
  const handleChange = e => {
    setAmountReceived(e.target.value)
    setAmountError(
      parseFloat(e.target.value) >
        parseFloat(order.purchaseTotalPendingPayment?.$numberDecimal)
    )
  }

  const toggleCheck = () => setTotalAmountChecked(!totalAmountChecked)

  useEffect(() => {
    if (!open) {
      cancelModal()
    }
  }, [open])

  return (
    <Modal
      closeIcon
      open={open}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Header icon='archive' content={t('modalPayRecHeader')} />
      <Modal.Content>
        <p className='p-red'> {t('modalPayRecContent')} </p>
        <div className='modal-paymentreceived__form'>
          <Form>
            <Form.Field>
              <Checkbox
                label={`${t('modalPayTotalOustandingBalance')} ${numToDollar(
                  order.purchaseTotalPendingPayment?.$numberDecimal
                )}`}
                checked={totalAmountChecked}
                onChange={() => toggleCheck()}
                ref={chkCash}
              />
            </Form.Field>
            <Form.Field>
              <Form.Input
                title={t('modalPayAmountReceivedTitle')}
                name='amount'
                type='number'
                label={t('modalPayAmountReceivedLabel')}
                placeholder={`${t(
                  'modalPayAmountReceivedPlaceholder'
                )} ${numToDollar(
                  order.purchaseTotalPendingPayment?.$numberDecimal
                )}`}
                value={amountReceived}
                disabled={totalAmountChecked}
                onChange={e => handleChange(e)}
                error={amountError && `${t('modalPayAmountReceivedError')}`}
              />
            </Form.Field>
          </Form>
          <Confirm
            size='tiny'
            content={t('modalPayBalanceUpdatingConfirmation')}
            open={openConfirm}
            onCancel={() => setOpenConfirm(false)}
            onConfirm={() => updatePayment()}
          />
        </div>
      </Modal.Content>
      <Modal.Actions>
        <Button color='red' onClick={() => cancelModal()}>
          <Icon name='remove' /> {t('modalPayCancelButton')}
        </Button>
        <Button
          color='green'
          onClick={() => setOpenConfirm(true)}
          loading={loadingUpdate}
          disabled={
            (amountError ||
              parseFloat(amountReceived) <= 0 ||
              (!amountReceived && !totalAmountChecked)) &&
            !totalAmountChecked
          }
        >
          <Icon name='checkmark' /> {t('modalPayConfirmButton')}
        </Button>
      </Modal.Actions>
    </Modal>
  )
}
