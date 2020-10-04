import { Card, CardContent, Typography } from '@material-ui/core'
import React , { forwardRef } from 'react'
import './Message.css'


const Message = forwardRef((props,ref )=> {
  console.log(props.username)
  console.log(props.data.username)
  const isUser = props.username === props.data.username

  return (
    <div ref={ref} className={`message ${isUser && 'message__user'}`}>
      <Card  className={isUser?'message__userCard':'message__guestCard'}>
        <CardContent>
          <Typography
          color="white"
          variant="h5"
          component="h2"
          >
          {!isUser && `${props.data.username || 'unkown user' }:`} {props.data.message}
          </Typography>
        </CardContent>
      </Card>
    </div>

  )
})

export default Message
