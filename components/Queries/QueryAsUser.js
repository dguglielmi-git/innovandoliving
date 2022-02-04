import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { Grid } from "semantic-ui-react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { confirmDialog } from "primereact/confirmdialog"
import { formatDate } from "../../utils/util";
import { getOpenChats, markChatMessageAsRead } from "../../api/producto";
import "primeicons/primeicons.css";
import 'primereact/resources/primereact.css';
import "primereact/resources/primereact.min.css";
import 'primereact/resources/themes/saga-blue/theme.css';
import { IS_NORMAL_USER } from "../../utils/constants";

export default function QueryAsUser() {
    const [messages, setMessages] = useState([]);
    const [selectedMessage, setSelectedMessage] = useState(null);
    const [reloadMsgs, setReloadMsgs] = useState(false);
    const router = useRouter();
    const { t } = useTranslation();

    useEffect(async () => {
        const msgdata = await getOpenChats();
        msgdata.map(m => m.createAt = formatDate(m.createAt))
        setMessages(msgdata);
        setReloadMsgs(false);
    }, [reloadMsgs]);

    const acceptDialog = async (msg) => {
        await markChatMessageAsRead(msg.productId, msg.userId, IS_NORMAL_USER);
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
                            dataKey="_id"
                            sortField="clientUnreadMsg"
                            sortOrder={ -1 }
                            scrollable
                            scrollHeight="350px"
                            selectionMode="single"
                            responsiveLayout="scroll"
                            value={ messages }
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