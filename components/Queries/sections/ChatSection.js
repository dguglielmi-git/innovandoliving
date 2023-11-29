import React, { useState, useEffect } from 'react'
import { size } from 'lodash'
import { useTranslation } from 'react-i18next'
import ReactScrollableFeed from 'react-scrollable-feed'
import { Container, Comment, Grid } from 'semantic-ui-react'
import {
  addMessageToProduct,
  getChatMessagesByProduct
} from '../../../api/producto'
import { getMeApi } from '../../../api/user'
import useAuth from '../../../hooks/useAuth'
import { isUserOwner } from '../../../api/orderMessage'
import { USER_CLIENT, USER_OWNER } from '../../../utils/constants'
import FormComment from '../../Orders/Order/FormComment'
import BasicLoading from '../../BasicLoading/BasicLoading'
import CommentBody from '../../Orders/Order/content/sections/CommentBody'

export default function ChatSection (props) {
  const { selectedMsg, setReloadMsgs } = props
  const { t } = useTranslation()
  const { auth, logout } = useAuth()
  const [loading, setLoading] = useState(false)
  const [username, setUsername] = useState('')
  const [userType, setUserType] = useState(false)
  const [renderMsg, setRenderMsg] = useState([])
  const [reloadChat, setReloadChat] = useState(false)

  const setMsgs = async () => {
    const msgs = await getChatMessagesByProduct(
      selectedMsg?.productId,
      selectedMsg?.userId
    )
    setRenderMsg(msgs)
    setReloadChat(false)
  }
  useEffect(() => {
    ;(async () => {
      setLoading(true)
      const user = await getMeApi(logout)
      setUsername(user.name + ' ' + user.lastname)
      if (auth) {
        const { idUser } = auth
        const res = await isUserOwner(idUser)
        if (res) {
          setUserType(USER_OWNER)
        } else {
          setUserType(USER_CLIENT)
        }
      }
      setLoading(false)
    })()
  }, [auth])

  useEffect(() => {
    setRenderMsg(selectedMsg?.messages)
  }, [selectedMsg])

  useEffect(() => {
    setMsgs()
  }, [reloadChat])

  const addComment = async event => {
    event.preventDefault()
    const comment = event.target[0].value
    event.target[0].value = ''
    await addMessageToProduct(
      selectedMsg?.productName,
      selectedMsg?.productId,
      selectedMsg?.userId,
      username,
      comment,
      userType
    )
    setReloadChat(true)
    setReloadMsgs(true)
  }

  if (loading)
    return (
      <BasicLoading classValue='queries' label={t('queriesLoadingQueries')} />
    )

  return (
    <Grid.Row>
      <div className='chat-section'>
        <Container>
          <Comment.Group>
            <div className='chat-section__header'>
              <h3>{t('queriesChatHeader')}</h3>
            </div>

            <div className='chat-section__feed'>
              <ReactScrollableFeed>
                {size(renderMsg) > 0 && <CommentBody renderMsg={renderMsg} />}
              </ReactScrollableFeed>
            </div>

            <FormComment
              addComment={addComment}
              sendLabel={t('queriesSendReply')}
              orderBlocked={false}
            />
          </Comment.Group>
        </Container>
      </div>
    </Grid.Row>
  )
}
