import React, { useState, useEffect } from 'react';
import { size } from 'lodash';
import { Button, Comment, Form } from 'semantic-ui-react';
import useAuth from '../../../../hooks/useAuth';
import { getMeApi } from '../../../../api/user';
import { addMessage, getMessagesByOrder } from '../../../../api/orderMessage';
import { formatDate } from '../../../../utils/util';

const CommentsForm = (props) => {
    const { order, setReloadOrder } = props;
    const [username, setUsername] = useState("");
    const [renderMsg, setRenderMsg] = useState([]);
    const { messages } = order;
    const { logout } = useAuth();

    useEffect(() => {
        (async () => {
            const user = await getMeApi(logout);
            setUsername(user.name + " " + user.lastname);
            await setRenderMsg(messages);
        })();
    }, [])

    // useEffect(() => {
    //     setInterval(async () => {
    //         if (order) {
    //             const result = await getMessagesByOrder(order._id);
    //             setRenderMsg(result);
    //         }
    //     }, 5000)
    // },[])

    const reloadMessage = async () => {
        if (order) {
            const result = await getMessagesByOrder(order._id);
            return result;
        }
        return null;
    }


    const CommentHeader = () => (
        <div>
            <h3>Contacto con Atención al cliente</h3>
        </div>
    );

    const FormReply = () => (
        <Form reply onSubmit={ (e) => addComment(e) }>
            <Form.TextArea />
            <Button content='Enviar Consulta'
                labelPosition='left'
                icon='edit'
                primary
                type="submit" />
        </Form>
    );

    const addComment = async (event) => {
        event.preventDefault();
        const comment = event.target[0].value;
        event.target[0].value = ""
        console.log(order)
        await addMessage(username, order._id, comment, "client");
        setReloadOrder(true);
    }

    const EmptyForm = () => (
        <Comment.Group>
            <CommentHeader />
            <FormReply />
        </Comment.Group>
    )

    const getIcon = (icon) => (icon === 'owner' ? 'supporticon' : icon);

    if (size(renderMsg) === 0 || renderMsg === []) return (<EmptyForm />)

    return (
        <Comment.Group>
            <CommentHeader />
            { renderMsg.map(msg => (
                <Comment>
                    <Comment.Avatar src={ `/${getIcon(msg.icon)}.png` } />
                    <Comment.Content>
                        <Comment.Author as='a'>{ msg.username }</Comment.Author>
                        <Comment.Metadata>
                            <div>{ formatDate(msg.messageDate) }</div>
                        </Comment.Metadata>
                        <Comment.Text>
                            <p>{ msg.message }</p>
                        </Comment.Text>
                    </Comment.Content>
                </Comment>
            )) }
            <FormReply />
        </Comment.Group>
    );
}

export default CommentsForm;