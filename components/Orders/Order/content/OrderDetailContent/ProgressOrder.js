import React, { useState, useReducer, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import OrderTimeLine from './OrderTimeLine'
import OptionsOrderStatus from './OptionsOrderStatus'
import { drawTimeLineOfOrder } from '../../../../../utils/util'
import { progressOrderReducer } from '../../../../../utils/reducer'
import { getOrderStatuses, updateOrderStatus } from '../../../../../api/order'

export default function ProgressOrder (props) {
  const { order, userType, setReloadOrder, orderBlocked, setOrderBlocked } =
    props
  const [options, setOptions] = useState([])
  const [statusValue, setStatusValue] = useState(-1)
  const [historyStatus, setHistoryStatus] = useState([])
  const { t } = useTranslation()

  const setStatuses = async () => {
    const statuses = await getOrderStatuses()
    setOptions(statuses)
  }

  useEffect(() => {
    setHistoryStatus(order.status_history)
    setStatuses()
    setStatusValue(order.status)
  }, [order])

  const [state, dispatch] = useReducer(progressOrderReducer, {
    open: false,
    dimmer: undefined
  })
  const { open, dimmer } = state

  const openModal = () => dispatch({ type: 'OPEN_MODAL', dimmer: 'blurring' })

  const closeModal = () => dispatch({ type: 'CLOSE_MODAL' })

  const handleChange = async (e, { value }) => setStatusValue(value)

  const handleCancel = () => closeModal()

  const handleUpdate = async () => {
    const history = await updateOrderStatus(order, statusValue)
    setHistoryStatus(history.status_history)
    setReloadOrder(true)
    if (statusValue == 99 || statusValue == 12) setOrderBlocked(true)
    closeModal()
  }

  return (
    <div className='order-detail__mainbox-orderstatus'>
      <h5>{t('progressOrderTitle')}</h5>

      <OptionsOrderStatus
        open={open}
        order={order}
        dimmer={dimmer}
        options={options}
        userType={userType}
        statusValue={statusValue}
        orderBlocked={orderBlocked}
        openModal={openModal}
        closeModal={closeModal}
        handleCancel={handleCancel}
        handleUpdate={handleUpdate}
        handleChange={handleChange}
        setReloadOrder={setReloadOrder}
      />

      <OrderTimeLine
        historyStatus={historyStatus}
        drawTimeLineOfOrder={drawTimeLineOfOrder}
      />
    </div>
  )
}
