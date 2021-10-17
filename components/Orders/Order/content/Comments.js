import React from 'react'
import { Button, Comment, Form, Header } from 'semantic-ui-react'


const CommentExampleComment = () => (

    <Comment.Group>
        <div>
            <h3>Contacto con Atención al cliente</h3>
        </div>

        <Comment>
            <Comment.Avatar src='/client.png' />
            <Comment.Content>
                <Comment.Author as='a'>Pepino Pepinillo</Comment.Author>
                <Comment.Metadata>
                    <div>Yesterday at 12:30AM</div>
                </Comment.Metadata>
                <Comment.Text>
                    <p>Me podrian informar cuando va a estar lista mi orden?</p>
                </Comment.Text>
            </Comment.Content>
        </Comment>

        <Comment>
            <Comment.Avatar src='/supporticon.png' />
            <Comment.Content>
                <Comment.Author as='a'>InnovandoLiving</Comment.Author>
                <Comment.Metadata>
                    <div>Today at 5:42PM</div>
                </Comment.Metadata>
                <Comment.Text>Hola Pepino, tu orden esta en camino y deberia estar llegando hoy por la tarde.</Comment.Text>
            </Comment.Content>
        </Comment>

        <Comment>
            <Comment.Avatar src='/client.png' />
            <Comment.Content>
                <Comment.Author as='a'>Pepino Pepinillo</Comment.Author>
                <Comment.Metadata>
                    <div>Yesterday at 12:30AM</div>
                </Comment.Metadata>
                <Comment.Text>
                    <p>Perfecto entonces, la espero, muchas gracias por la respuesta!</p>
                </Comment.Text>
            </Comment.Content>
        </Comment>

        <Comment>
            <Comment.Avatar src='/supporticon.png' />
            <Comment.Content>
                <Comment.Author as='a'>InnovandoLiving</Comment.Author>
                <Comment.Metadata>
                    <div>Today at 5:42PM</div>
                </Comment.Metadata>
                <Comment.Text>Cualquier otra consulta no dude en contactarnos. Que tenga un excelente día. 😊 </Comment.Text>
            </Comment.Content>
        </Comment>

        <Form reply>
            <Form.TextArea />
            <Button content='Enviar Consulta' labelPosition='left' icon='edit' primary />
        </Form>
    </Comment.Group>
)

export default CommentExampleComment