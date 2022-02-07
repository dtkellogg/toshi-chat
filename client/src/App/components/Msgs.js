import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { v4 as uuid } from 'uuid'


export default function Msgs({ name: currentUser, socket }) {
  const [msgs, setMsgs] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    if(socket === undefined) {
      navigate('/')
    } else {
      socket.on('msg', (msg, name) => {
        if((msgs.length > 0) && (msgs[msgs.length - 1]["name"] === currentUser)) {
            console.log("----------------------SAME NAME----------------------");
          }
        setMsgs((oldMsgs) => [...oldMsgs, {msg: msg, name: name, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}).trim()}]);
      })
  
      socket.on('new-user', (msg, notification) => {
        // console.log("MSG");
        // console.log(msg);
        setMsgs((oldMsgs) => [...oldMsgs, {msg: msg, notification: notification, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}).trim()}]);
      })
  
      socket.on('user-gone', (msg, notification) => {
        setMsgs((oldMsgs) => [...oldMsgs, {msg: msg, notification: notification, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}).trim()}]);
      })
    }
  }, [socket])

  useEffect(() => {
    var objDiv = document.getElementById("msg-container");
    objDiv.scrollTop = objDiv.scrollHeight;
  }, [msgs])

  // console.log("----------------------MESSAGES----------------------");
  // console.log(msgs);

  return (
    <div className="msgs__container" id="msg-container">
      {msgs.map((m, i) => {
        const { name, msg, time, notification } = m
        const showHeader = ( i === 0 || msgs[i-1].name !== name )
        const sameUser = (name === currentUser)

        return (
          (notification) ? (
            <div className="msg__person--notification" key={uuid()}>
              <span className="">{msg} ({time})</span>
            </div>
          ) : sameUser ? (
            <section className="msg__container--self" key={uuid()}>
              {showHeader && (
                <div className="msg__container--header-self">
                  <span className="msg__name">{name} </span>
                  <span className="msg__time">{time}</span>
                </div>
              )}
              <span className="msg__person--self" 
              // style={sameUser ? {"margin": 0} : {"margin": "0.25rem 0"}}
              >{msg}</span>
            </section>
          ) : (
            <section className="msg__container--other" key={uuid()} style={showHeader ? {"marginTop": "1rem"} : {"marginTop": "0"}}>
              {showHeader && (
              <div className="msg__container--header-other" >
                <span className="msg__name">{name} </span>
                <span className="msg__time">{time}</span>
              </div>
              )}
              <div className="msg__person--other">{msg}</div>
            </section>
          )
        )
      })}
    </div>
  )
}