import React, { useState } from 'react'
import { Grid } from 'semantic-ui-react'
import { Column } from 'primereact/column'
import { DataTable } from 'primereact/datatable'
import useMsgs from '../../../hooks/useMsgs'
import { useTranslation } from 'react-i18next'

export default function MsgQueue (props) {
  const { messages, showData } = props
  const { setReloadMsgCounter } = useMsgs()
  const [selectedMessage, setSelectedMessage] = useState(null)
  const { t } = useTranslation()

  const selectMsg = msg => {
    msg.unreadmsgs = 0
    messages.map(m => {
      if (m._id === msg._id) {
        m = msg
      }
    })
    setReloadMsgCounter(true)
    setSelectedMessage(msg)
    showData(msg)
  }

  return (
    <Grid.Row>
      <div className='msg-queue'>
        <div className='datatable-selection-demo'>
          <DataTable
            scrollable
            dataKey='_id'
            sortOrder={-1}
            value={messages}
            scrollHeight='300px'
            selectionMode='single'
            sortField='unreadmsgs'
            responsiveLayout='scroll'
            selection={selectedMessage}
            onSelectionChange={e => selectMsg(e.value)}
          >
            <Column field='createAt' header={t('msgQueueDate')}></Column>
            <Column field='productName' header={t('msgQueueProduct')}></Column>
            <Column field='username' header={t('msgQueueUsername')}></Column>
            <Column
              field='unreadmsgs'
              header={t('msgQueueUnreadMsgs')}
            ></Column>
          </DataTable>
        </div>
      </div>
    </Grid.Row>
  )
}
