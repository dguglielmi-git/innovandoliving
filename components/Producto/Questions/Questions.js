import React, { useState, useEffect } from "react";
import { size } from "lodash";
import { Container, Comment } from "semantic-ui-react";
import { useTranslation } from "react-i18next";
import { getMeApi } from "../../../api/user";
import { isUserOwner } from "../../../api/orderMessage";
import { USER_CLIENT, USER_OWNER } from "../../../utils/constants";
import {
    addMessageToProduct,
    getChatMessagesByProduct,
    markChatMessageAsRead
} from "../../../api/producto";
import CommentsHeader from "./sections/CommentHeader";
import CommentsEmpty from "./sections/CommentsEmpty";
import CommentBody from "../../Orders/Order/content/sections/CommentBody";
import FormComment from "../../Orders/Order/FormComment";
import useAuth from "../../../hooks/useAuth";
import BasicLoading from "../../BasicLoading/BasicLoading";

export default function Questions(props) {
    const { product } = props;
    const { t } = useTranslation();
    const { auth, logout } = useAuth();
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState("");
    const [renderMsg, setRenderMsg] = useState([]);
    const [userType, setUserType] = useState(false);
    const [reloadChat, setReloadChat] = useState(false);

    useEffect(() => {
        (async () => {
            setLoading(true);
            const user = await getMeApi(logout);
            setUsername(user.name + " " + user.lastname);
            if (auth) {
                const { idUser } = auth;
                const res = await isUserOwner(idUser);
                if (res) {
                    setUserType(USER_OWNER);
                } else {
                    setUserType(USER_CLIENT);
                }
            }
            setLoading(false);
        })()
    }, [auth]);

    useEffect(async () => {
        const msgs = await getChatMessagesByProduct(product?._id, auth?.idUser);
        setRenderMsg(msgs);
        setReloadChat(false);
    }, [reloadChat]);

    useEffect(() => {
        const interval = setInterval(async () => {
            const msgs = await getChatMessagesByProduct(product?._id, auth?.idUser);
            await markChatMessageAsRead(product?._id, auth?.idUser, userType);
            setRenderMsg(msgs);
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    const addComment = async (event) => {
        event.preventDefault();
        const comment = event.target[0].value;
        event.target[0].value = "";
        await addMessageToProduct(product?.title, product?._id, auth?.idUser, username, comment, userType);
        setReloadChat(true);
    }

    if (loading) return <BasicLoading classValue="questions" label={ t('questionsLoadingProduct') } />

    return (
        <div className="questions">
            <Container>
                <Comment.Group>
                    <CommentsHeader />
                    { ((size(renderMsg) > 0)
                        ? <CommentBody renderMsg={ renderMsg } />
                        : <CommentsEmpty />) }
                    <FormComment
                        addComment={ addComment }
                        sendLabel={ t('questionsSendMessageLabel') }
                        orderBlocked={ false }
                    />
                </Comment.Group>
            </Container>
        </div>
    )
}