import React, { useState, useEffect } from "react";
import { size } from "lodash";
import { Container, Comment } from "semantic-ui-react";
import { getChatMessagesByProduct } from "../../../api/producto";
import CommentBody from "../../Orders/Order/content/sections/CommentBody";
import FormComment from "../../Orders/Order/FormComment";
import useAuth from "../../../hooks/useAuth";

export default function Questions(props) {
    const { product } = props;
    const { auth } = useAuth();
    const [userId, setUserId] = useState('');
    const [renderMsg, setRenderMsg] = useState([]);

    useEffect(async () => {
        const msgs = await getChatMessagesByProduct(product?._id, auth?.idUser);
        setRenderMsg(msgs);
    }, []);

    const addComment = async () => {
        console.log('adding comment');
    }

    return (
        <div className="questions">
            <Container>
                <Comment.Group>
                    <div className="questions__header">
                        <h3>Ask a question about this product!</h3>
                    </div>
                    { ((size(renderMsg) > 0)
                        ? <CommentBody renderMsg={ renderMsg } />
                        : <div><h3> no comments </h3></div>) }
                    <FormComment
                        addComment={ addComment }
                        sendLabel="Send question"
                        orderBlocked={ false }
                    />

                </Comment.Group>

            </Container>
        </div>
    )
}