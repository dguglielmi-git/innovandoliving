import React, { useState, useEffect } from 'react';
import { size } from 'lodash';
import { Comment } from 'semantic-ui-react';
import { useTranslation } from 'react-i18next';
import useAuth from '../../../../hooks/useAuth';
import { getMeApi } from '../../../../api/user';
import {
    addMessage,
    getMessagesByOrder,
    markMessageAsRead
} from '../../../../api/orderMessage';
import { verifyUserType } from '../../../../utils/util';
import FormComment from '../FormComment';
import CommentBody from './sections/CommentBody';

const CommentsForm = (props) => {
    const {
        order,
        setReloadOrder,
        sendLabel,
        userType,
        orderBlocked } = props;
    const [username, setUsername] = useState("");
    const [renderMsg, setRenderMsg] = useState([]);
    const { t } = useTranslation();
    const { logout } = useAuth();

    useEffect(() => {
        (async () => {
            const user = await getMeApi(logout);
            setUsername(user.name + " " + user.lastname);
            const messages = await getMessagesByOrder(order._id);
            setRenderMsg(messages);
        })();
    }, []);

    useEffect(() => {
        const interval = setInterval(async () => {
            const result = await getMessagesByOrder(order._id);
            await markMessageAsRead(order._id, verifyUserType(userType))
            setRenderMsg(result)
        }, 30000);
        return () => clearInterval(interval);
    }, [])

    const reloadMessage = async () => {
        if (order) {
            const result = await getMessagesByOrder(order._id);
            await markMessageAsRead(order._id, verifyUserType(userType))
            setRenderMsg(result)
            return result;
        }
        return null;
    }

    const addComment = async (event) => {
        event.preventDefault();
        const comment = event.target[0].value;
        event.target[0].value = ""
        await addMessage(username, order._id, comment, userType);
        await reloadMessage();
        setReloadOrder(true);
    }

    const CommentHeader = () => (
        <div>
            <h3>{
                (order?.status !== 99)
                    ? t('commentsSupportContact')
                    : t('commentsHistory') } </h3>
        </div>
    );

    return (
        <Comment.Group>
            <CommentHeader />
            <CommentBody
                renderMsg={ renderMsg }
            />
            { size(renderMsg) === 0 && <h4><i>{ t('commentsNoMessages') }</i></h4> }
            { (order?.status !== 99) &&
                <FormComment
                    addComment={ addComment }
                    sendLabel={ sendLabel }
                    orderBlocked={ orderBlocked }
                /> }
        </Comment.Group>
    );
}

export default CommentsForm;
