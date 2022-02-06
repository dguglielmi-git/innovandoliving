import React, { useState, useEffect } from "react";
import { Grid, Divider } from "semantic-ui-react";
import { getOpenChats, markChatMessageAsRead } from "../../api/producto";
import ChatSection from "./sections/ChatSection";
import MsgQueue from "./sections/MsgQueue";
import { formatDate } from "../../utils/util";
import { IS_OWNER } from "../../utils/constants";
import useMsgs from "../../hooks/useMsgs";

export default function QueryAsAdmin() {
    const [messages, setMessages] = useState([]);
    const [selectedMsg, setSelectedMsg] = useState({});
    const [reloadMsgs, setReloadMsgs] = useState(false);
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