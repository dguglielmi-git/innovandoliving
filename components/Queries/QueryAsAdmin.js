import React, { useState, useEffect } from "react";
import { Grid, Divider } from "semantic-ui-react";
import { getOpenChats, markChatMessageAsRead } from "../../api/producto";
import { formatDate, verifyUserType } from "../../utils/util";
import { USER_OWNER } from "../../utils/constants";
import ChatSection from "./sections/ChatSection";
import MsgQueue from "./sections/MsgQueue";

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
        await markChatMessageAsRead(msg.productId, msg.userId, verifyUserType(USER_OWNER));
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