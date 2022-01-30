import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Msgs({ name, socket }) {
  const [msgs, setMsgs] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    if(socket === undefined) {
      console.log("UNDEFINED");
      navigate('/')
    } else {
      socket.on('msg', (msg, name, color) => {
        setMsgs((oldMsgs) => [...oldMsgs, {msg: msg, name: name, color: color, time: new Date().toLocaleTimeString()}]);
      })
  
      socket.on('new-user', (msg, color, notification) => {
        console.log("MSG");
        console.log(msg);
        setMsgs((oldMsgs) => [...oldMsgs, {msg: msg, color: color, notification: notification, time: new Date().toLocaleTimeString()}]);
      })
  
      socket.on('user-gone', (msg, color, notification) => {
        setMsgs((oldMsgs) => [...oldMsgs, {msg: msg, color: color, notification: notification, time: new Date().toLocaleTimeString()}]);
      })
    }
  }, [socket])

  useEffect(() => {
    var objDiv = document.getElementById("msg-container");
    objDiv.scrollTop = objDiv.scrollHeight;
  }, [msgs])


  return (
    <div className="msg__container" id="msg-container">
      {msgs.map((m) => {

        return (
          (m.notification) ? (
            <div className="msg__person--notification" style={{'fontSize': '13px'}}>
              {/* <span className="" style={{'color': m.color}, {'fontWeight': 'bold'}}>{m.time}: </span> */}
              <span className="">{m.msg} ({m.time})</span>
            </div>
          ) : (m.name === name) ? (
            <div className="msg__person--self" style={{'fontSize': '13px'}}>
              {/* <span className="" style={{'color': m.color}, {'fontWeight': 'bold'}}>{m.time}: </span> */}
              <span className="">{m.msg}</span>
            </div>
          ) : (
            <div className="msg__person--other" style={{'fontSize': '13px'}}>
              <span className="" style={{'color': m.color}, {'fontWeight': 'bold'}}>{m.name}: &nbsp;</span>
              <span className="">{m.msg}</span>
            </div>
            
          )
        )
      })}
    </div>
  )
}