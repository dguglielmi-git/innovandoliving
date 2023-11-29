import React, { useState, useEffect } from 'react'
import { Divider } from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'
import useMsgs from '../../../../hooks/useMsgs'
import { verifyUserType } from '../../../../utils/util'
import ButtonBack from './OrderDetailContent/ButtonBack'
import ProgressOrder from './OrderDetailContent/ProgressOrder'
import OrderStatusLabel from './OrderDetailContent/OrderStatusLabel'
import OrderDetailedTable from './OrderDetailContent/OrderDetailedTable'
import OrderCommentSection from './OrderDetailContent/OrderCommentSection'
import { markMessageAsRead } from '../../../../api/orderMessage'
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'

export default function OrderDetails (props) {
  const { setShowDetail, order, setReloadOrder, userType } = props
  const [orderBlocked, setOrderBlocked] = useState(false)
  const { setReloadMsgCounter } = useMsgs()
  const { t } = useTranslation()

  const getMsgsOrder = async () => {
    if (order) {
      await markMessageAsRead(order._id, verifyUserType(userType))
      setReloadOrder(true)
      setReloadMsgCounter(true)
    }
  }
  useEffect(() => {
    getMsgsOrder()
  }, [])

  const goBack = () => setShowDetail(false)

  return (
    <div className='order-detail__mainbox'>
      <ButtonBack goBack={goBack} label={t('orderDetailsBackButton')} />

      <OrderStatusLabel order={order} />

      <ProgressOrder
        order={order}
        userType={userType}
        setReloadOrder={setReloadOrder}
        orderBlocked={orderBlocked}
        setOrderBlocked={setOrderBlocked}
      />

      <OrderDetailedTable order={order} />

      <Divider section />

      <OrderCommentSection
        order={order}
        setReloadOrder={setReloadOrder}
        sendLabel={t('orderDetailSendCommentLabel')}
        userType={userType}
        orderBlocked={orderBlocked}
      />
    </div>
  )
}
