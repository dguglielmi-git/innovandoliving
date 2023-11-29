import React from 'react'
import { Comment } from 'semantic-ui-react'
import { formatDate } from '../../../../../utils/util'

export default function CommentBody (props) {
  const { renderMsg } = props

  const getIcon = icon => (icon === 'owner' ? 'supporticon' : icon)

  return (
    <>
      {renderMsg.map(msg => (
        <Comment key={msg._id}>
          <Comment.Avatar src={`/${getIcon(msg.icon)}.png`} />
          <Comment.Content>
            <Comment.Author as='a'>{msg.username}</Comment.Author>
            <Comment.Metadata>
              <div>{formatDate(msg.messageDate)}</div>
            </Comment.Metadata>
            <Comment.Text>
              <p>{msg.message}</p>
            </Comment.Text>
          </Comment.Content>
        </Comment>
      ))}
    </>
  )
}
