import React from 'react'
import { TabView, TabPanel } from 'primereact/tabview'
import { useTranslation } from 'react-i18next'
import ActiveOrders from './Tables/ActiveOrders/ActiveOrders'
import ClosedOrders from './Tables/ClosedOrders/ClosedOrders'

export default function ActiveClosedTabs (props) {
  const { t } = useTranslation()
  const {
    orders,
    showDetail,
    setShowDetail,
    setOrderSelected,
    finishedOrders
  } = props

  return (
    <TabView>
      <TabPanel header={t('orderTabActive')}>
        <div className='order-admin__table'>
          <ActiveOrders
            orders={orders}
            showDetail={showDetail}
            setShowDetail={setShowDetail}
            setOrderSelected={setOrderSelected}
          />
        </div>
      </TabPanel>
      <TabPanel header={t('orderTabClosed')}>
        <div className='order-admin__table'>
          <ClosedOrders
            orders={finishedOrders}
            showDetail={showDetail}
            setShowDetail={setShowDetail}
            setOrderSelected={setOrderSelected}
          />
        </div>
      </TabPanel>
    </TabView>
  )
}
