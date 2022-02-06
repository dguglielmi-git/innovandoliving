import React, { useState } from "react";
import { Grid } from "semantic-ui-react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import useMsgs from "../../../hooks/useMsgs";

export default function MsgQueue(props) {
    const { messages, showData } = props;
    const [selectedMessage, setSelectedMessage] = useState(null);
    const { setReloadMsgCounter } = useMsgs();

    const selectMsg = (msg) => {
        msg.unreadmsgs = 0
        messages.map(m => {
            if (m._id === msg._id) {
                m = msg
            }
        });
        setReloadMsgCounter(true);
        setSelectedMessage(msg);
        showData(msg)
    }

    return (
        <Grid.Row>
            <div className="msg-queue">
                <div className="datatable-selection-demo">
                    <DataTable
                        dataKey="_id"
                        sortField="unreadmsgs"
                        sortOrder={ -1 }
                        scrollable
                        scrollHeight="300px"
                        selectionMode="single"
                        responsiveLayout="scroll"
                        value={ messages }
                        selection={ selectedMessage }
                        onSelectionChange={ e => selectMsg(e.value) }
                    >
                        <Column field="createAt" header="Date"></Column>
                        <Column field="productName" header="Product"></Column>
                        <Column field="username" header="Username"></Column>
                        <Column field="unreadmsgs" header="Unread Msgs"></Column>
                    </DataTable>
                </div>
            </div>
        </Grid.Row>
    )
}