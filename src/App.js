import { Button, FormControl, IconButton, Input, InputLabel } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import React from 'react';
import './App.css';
import db from './firebase';
import Message from './Message';
import firebase from 'firebase'
import FlipMove from 'react-flip-move'


function App() {
  const [input,setInput] = React.useState('')
  const [messages,setMessages] = React.useState([])
  const [username,setUsername] = React.useState('')


  const sendMessage = (event)=>{
    event.preventDefault()
    db.collection('messages').add({
      message:input,
      username:username,
      timestamp:firebase.firestore.FieldValue.serverTimestamp()
    })
    setInput('')
  }
  
  React.useEffect(()=>{
    db.collection('messages').orderBy('timestamp','desc').onSnapshot(snapshot => {
      setMessages(snapshot.docs.map(doc=> ({id:doc.id,d:doc.data()})))
    })
  },[])

  React.useEffect(()=>{
    setUsername(prompt('Please Enter Your Name'))
  },[])

  return (
    <div className="App">
    <img src="https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=100&h=100"/>
    <h2>Messenger App</h2>
    <h3>Welcome {username}</h3>
    
    <form className="app__form">
      <FormControl className="app__formControl ">
        <Input className="app__input" placeholder="Enter a message .." autoComplete="off"  value={input} onChange={event=>setInput(event.target.value)} />

        <IconButton className="app__iconButton" disabled={!input} type="submit" onClick={sendMessage} variant="contained" color="primary">
          <SendIcon />
        </IconButton>

      </FormControl>
    </form>
      
      <FlipMove>
        {messages.map(({id,d})=>(
          <Message key={id} username={username} data={d} />
        ))}
      </FlipMove>

    </div>
  );
}

export default App;
