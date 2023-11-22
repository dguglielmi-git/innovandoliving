import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { USER_OWNER, ORDER_CLOSED } from '../../../../../utils/constants'
import ComboStatus from './ComboStatus'
import ModalPaymentReceived from './ModalPayRec'
import ShowButtonUpdate from './ShowButtonUpdate'
import UpdateModal from '../../../../Modal/UpdateModal/UpdateModal'

export default function OptionsOrderStatus (props) {
  const {
    closeModal,
    dimmer,
    handleCancel,
    handleChange,
    handleUpdate,
    open,
    openModal,
    options,
    order,
    orderBlocked,
    setReloadOrder,
    statusValue,
    userType
  } = props
  const { t } = useTranslation()
  const [showModalPayRec, setShowModalPayRec] = useState(false)

  return (userType == USER_OWNER) & (order?.status !== ORDER_CLOSED) ? (
    <div className='order-detail__mainbox-orderstatus-update'>
      <ModalPaymentReceived
        open={showModalPayRec}
        order={order}
        setOpen={setShowModalPayRec}
        setReloadOrder={setReloadOrder}
      />

      <ShowButtonUpdate
        order={order}
        openModal={openModal}
        orderBlocked={orderBlocked}
        setShowModal={setShowModalPayRec}
      />

      <UpdateModal
        size='tiny'
        open={open}
        dimmer={dimmer}
        closeModal={closeModal}
        handleCancel={handleCancel}
        handleUpdate={handleUpdate}
        header={t('modalProgressOrderHeader')}
        cancelBtnLabel={t('modalProgressOrderCancelButton')}
        updateBtnLabel={t('modalProgressOrderUpdateButton')}
      >
        {t('modalProgressOrderChildrenLabel')}
        <ComboStatus
          options={options}
          handleChange={handleChange}
          statusValue={statusValue}
        />
      </UpdateModal>
    </div>
  ) : (
    <div></div>
  )
}
