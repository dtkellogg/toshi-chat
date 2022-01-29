import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from "react-router-dom"
import Inputs from './NewMsg'
import Msgs from './Msgs'
import io from 'socket.io-client'

// const socket = io.connect("http://localhost:5000")
const socket = io.connect(process.env.REACT_APP_ENV === 'development' ? "http://localhost:5000" : 'https://toshi-chat.herokuapp.com/')

export default function Chat() {
  const { state: name } = useLocation()
  const navigate = useNavigate()

  console.log(`name: ${name}`);
  
  useEffect(() => {
    if(!name) navigate('/')
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