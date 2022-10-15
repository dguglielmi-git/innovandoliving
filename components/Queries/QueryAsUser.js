import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Grid } from "semantic-ui-react";
import { Column } from "primereact/column";
import { useTranslation } from "react-i18next";
import { DataTable } from "primereact/datatable";
import { confirmDialog } from "primereact/confirmdialog"
import useMsgs from "../../hooks/useMsgs";
import { formatDate } from "../../utils/util";
import { IS_NORMAL_USER } from "../../utils/constants";
import { getOpenChats, markChatMessageAsRead } from "../../api/producto";
import "primeicons/primeicons.css";
import 'primereact/resources/primereact.css';
import "primereact/resources/primereact.min.css";
import 'primereact/resources/themes/saga-blue/theme.css';

export default function QueryAsUser() {
    const router = useRouter();
    const { t } = useTranslation();
    const [messages, setMessages] = useState([]);
    const [reloadMsgs, setReloadMsgs] = useState(false);
    const { queryCounter, setReloadMsgCounter } = useMsgs();
    const [selectedMessage, setSelectedMessage] = useState(null);

    useEffect(async () => {
        const msgdata = await getOpenChats();
        msgdata.map(m => {
            m.createAt = formatDate(m.createAt);
            if (m._id === selectedMessage?._id) {
                setSelectedMessage(m)
                markChatMessageAsRead(m.productId, m.userId, IS_NORMAL_USER);
                setReloadMsgCounter(true);
            }
        });
        setMessages(msgdata);
        setReloadMsgs(false);
    }, [reloadMsgs, queryCounter]);

    const acceptDialog = async (msg) => {
        await markChatMessageAsRead(msg.productId, msg.userId, IS_NORMAL_USER);
        setReloadMsgCounter(true);
        router.push(`/${msg.url}`)
    }

    const goToProduct = (msg) => {
        confirmDialog({
            message: t('queriesUserDialogRouterMessage'),
            header: t('queriesUserDialogRouterHeader'),
            icon: 'pi pi-exclamation-triangle',
            accept: () => acceptDialog(msg),
            acceptLabel: t('queriesUserDialogYesButton'),
            rejectLabel: t('queriesUserDialogRejectButton'),
            rejectClassName: 'none'
        });
    };

    const selectMsg = (msg) => {
        setSelectedMessage(msg);
        goToProduct(msg);
    }

    return (
        <div className="queries-user">
            <div className="queries-user__header">
                <h4>{ t('queriesUserTitle') }</h4>
            </div>
            <Grid padded>
                <Grid.Row>
                    <div className="queries-user__queue">
                        <DataTable
                            scrollable
                            dataKey="_id"
                            sortOrder={ -1 }
                            value={ messages }
                            scrollHeight="350px"
                            selectionMode="single"
                            responsiveLayout="scroll"
                            sortField="clientUnreadMsg"
                            selection={ selectedMessage }
                            onSelectionChange={ e => selectMsg(e.value) }
                        >
                            <Column field="createAt" header={ t('queriesUserDataTableDateHeader') }></Column>
                            <Column field="productName" header={ t('queriesUserDataTableProductHeader') }></Column>
                            <Column field="clientUnreadMsg" header={ t('queriesUserDataTableUnreadMsgHeader') }></Column>
                        </DataTable>
                    </div>
                </Grid.Row>
            </Grid>
        </div>
    )
}