import React from "react";
import { Button, Form } from "semantic-ui-react";

const FormComment = (props) => {
    const { addComment, sendLabel, orderBlocked } = props;

    return (
        <Form onSubmit={ (e) => addComment(e) }>
            <Form.TextArea disabled={ orderBlocked } />
            <Button content={ sendLabel } disabled={ orderBlocked }
                labelPosition='left'
                icon='edit'
                primary
                type="submit" />
        </Form>
    )
}

export default React.memo(FormComment);