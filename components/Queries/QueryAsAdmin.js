import React, { useState, useEffect } from "react";
import { Grid, Divider } from "semantic-ui-react";
import { getOpenChats, markChatMessageAsRead } from "../../api/producto";
import ChatSection from "./sections/ChatSection";
import MsgQueue from "./sections/MsgQueue";
import { formatDate } from "../../utils/util";
import { IS_OWNER } from "../../utils/constants";

export default function QueryAsAdmin() {
    const [messages, setMessages] = useState([]);
    const [selectedMsg, setSelectedMsg] = useState({});
    const [reloadMsgs, setReloadMsgs] = useState(false);

    useEffect(async () => {
        const msgdata = await getOpenChats();
        msgdata.map(m => m.createAt = formatDate(m.createAt))
        setMessages(msgdata);
        setReloadMsgs(false);
    }, [reloadMsgs]);

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