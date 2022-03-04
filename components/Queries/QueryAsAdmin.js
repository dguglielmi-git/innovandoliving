import React, { useState, useEffect } from "react";
import { Grid, Divider } from "semantic-ui-react";
import MsgQueue from "./sections/MsgQueue";
import useMsgs from "../../hooks/useMsgs";
import { formatDate } from "../../utils/util";
import { IS_OWNER } from "../../utils/constants";
import ChatSection from "./sections/ChatSection";
import { getOpenChats, markChatMessageAsRead } from "../../api/producto";

export default function QueryAsAdmin() {
    const [messages, setMessages] = useState([]);
    const [reloadMsgs, setReloadMsgs] = useState(false);
    const [selectedMsg, setSelectedMsg] = useState({});
    const { queryCounter, setReloadMsgCounter } = useMsgs();

    useEffect(async () => {
        const msgdata = await getOpenChats();
        msgdata.map(m => {
            m.createAt = formatDate(m.createAt)
            if (m._id === selectedMsg._id) {
                setSelectedMsg(m);
                markChatMessageAsRead(m.productId, m.userId, IS_OWNER);
                setReloadMsgCounter(true);
            }
        })
        setMessages(msgdata);
        setReloadMsgs(false);
    }, [reloadMsgs, queryCounter]);

    const showData = async (msg) => {
        await markChatMessageAsRead(msg.productId, msg.userId, IS_OWNER);
        setSelectedMsg(msg)
    }

    return (
        <div className="queries">
            <Grid padded>
                <ChatSection
                    selectedMsg={ selectedMsg }
                    setReloadMsgs={ setReloadMsgs }
                />

                <Divider section />

                <MsgQueue
                    messages={ messages }
                    showData={ showData }
                />
            </Grid>
        </div>
    )
}