import React, { useState, useEffect } from 'react'
import { useLocation } from "react-router-dom"
import Inputs from './Inputs'
import Msgs from './Msgs'
import io from 'socket.io-client'

const socket = io.connect("http://localhost:5000")
// const socket = io.connect(process.env.REACT_APP_ENV === 'development' ? "http://localhost:5000" : 'https://toshi-chat.herokuapp.com/')

export default function Chat() {
  const { state: name } = useLocation()

  // console.log("STATE");
  // console.log(name);
  
  useEffect(() => {
    socket.emit('new-user', name)

    return (name) => socket.disconnect(name)
  }, [])


  return (
    <div className="chat__container">
      <Msgs name={name} socket={socket} />
      <Inputs socket={socket} name={name} />
    </div>
  )
}