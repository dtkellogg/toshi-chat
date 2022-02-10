import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { listUsers } from '../actions/userActions'
import { v4 as uuid } from 'uuid'


export default function Msgs({ name: currentUser, socket }) {
  const [msgs, setMsgs] = useState([])
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if(socket === undefined || currentUser === undefined) {
      navigate('/')
    } else {
      socket.on('msg', (type, msg, name) => {
        if(type === 'new-msg') {
          setMsgs((oldMsgs) => [...oldMsgs, {
            type: type,
            msg: msg,
            name: name,
            time: new Date().toLocaleTimeString([], {
              hour: '2-digit',
              minute:'2-digit'
            }).trim()
          }])
        } else if (type === 'notification') {
          setMsgs((oldMsgs) => [...oldMsgs, {
            type: type,
            msg: msg,
            name: null,
            time: new Date().toLocaleTimeString([], {
              hour: '2-digit',
              minute:'2-digit'
            }).trim()
          }])
          dispatch(listUsers())
          }
        } 
      )
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
        const { type,  msg, name, time } = m
        const showHeader = ( i === 0 || msgs[i-1].name !== name )
        const sameUser = (name === currentUser)

        return (
          (type === 'notification') ? (
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
              <span className="msg__person--self">{msg}</span>
            </section>
          ) : (
            <section className="msg__container--other" key={uuid()} style={msgs.length > 0 && (showHeader && msgs[i-1].name && (msgs[i-1].name !== currentUser) && (msgs[i-1].type !== 'notification')) ? {"marginTop": "1rem"} : {"marginTop": "0"}}>
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