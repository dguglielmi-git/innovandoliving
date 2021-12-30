import React from "react";
import { Container } from "semantic-ui-react";
import Comments from "../Comments";

export default function OrderCommentSection(props) {
    const { order, setReloadOrder, sendLabel, userType, orderBlocked } = props;

    return (
        <div className="order-detail__mainbox-comments">
            <Container>
                <Comments
                    order={ order }
                    setReloadOrder={ setReloadOrder }
                    sendLabel={ sendLabel }
                    userType={ userType }
                    orderBlocked={ orderBlocked }
                />
            </Container>
        </div>
    )
}