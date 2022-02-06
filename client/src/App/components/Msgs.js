import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'


export default function Msgs({ name: userName, socket }) {
  const [msgs, setMsgs] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    if(socket === undefined) {
      console.log("UNDEFINED");
      navigate('/')
    } else {
      socket.on('msg', (msg, name, color) => {
        if((msgs.length > 0) && (msgs[msgs.length - 1]["name"] === userName)) {
            console.log("-------------SAME NAME-------------");
          }
        setMsgs((oldMsgs) => [...oldMsgs, {msg: msg, name: name, color: color, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}]);
      })
  
      socket.on('new-user', (msg, color, notification) => {
        console.log("MSG");
        console.log(msg);
        setMsgs((oldMsgs) => [...oldMsgs, {msg: msg, color: color, notification: notification, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}]);
      })
  
      socket.on('user-gone', (msg, color, notification) => {
        setMsgs((oldMsgs) => [...oldMsgs, {msg: msg, color: color, notification: notification, time: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}]);
      })
    }
  }, [socket])

  useEffect(() => {
    var objDiv = document.getElementById("msg-container");
    objDiv.scrollTop = objDiv.scrollHeight;
  }, [msgs])

  console.log("-------------MESSAGES-------------");
  console.log(msgs);

  return (
    <div className="msgs__container" id="msg-container">
      {msgs.map((m) => {

        return (
          (m.notification) ? (
            <div className="msg__person--notification">
              {/* <span className="" style={{'color': m.color}, {'fontWeight': 'bold'}}>{m.time}: </span> */}
              <span className="">{m.msg} ({m.time})</span>
            </div>
          ) : (m.name === userName) ? (
            <section className="msg__container--self">
              <div className="msg__container--header">
                <span className="msg__name" style={{'color': m.color}, {'fontWeight': 'bold'}, {'marginRight': '0.5rem'}}>{m.name}: </span>
                <span className="msg__time" style={{'color': m.color}, {'fontWeight': 'bold'}}>{m.time}</span>
              </div>
              <span className="msg__person--self">{m.msg}</span>
            </section>
          ) : (
            <section className="msg__container--other">
              <div className="msg__container--header">
                <span className="msg__name" style={{'color': m.color}, {'fontWeight': 'bold'}, {'marginRight': '0.5rem'}}>{m.name}: </span>
                <span className="msg__time" style={{'color': m.color}, {'fontWeight': 'bold'}}>{m.time}</span>
              </div>
              <div className="msg__person--other">{m.msg}</div>
            </section>
          )
        )
      })}
    </div>
  )
}