import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from "react-router-dom"
import NewMsg from './NewMsg'
import Msgs from './Msgs'
import Nav from './Nav'

export default function Chat({ socket }) {
  const { state: name } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if(!name || socket === undefined) {
      navigate('/')
    } else {
      socket.emit('new-user', name)
    }
  }, [])


  return (
    <div className="chat__container">
      <Nav socket={socket} />
      <Msgs name={name} socket={socket} />
      <NewMsg socket={socket} name={name} />
    </div>
  )
}