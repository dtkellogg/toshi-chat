import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from "react-router-dom"
import Inputs from './NewMsg'
import Msgs from './Msgs'

export default function Chat({socket}) {
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
      <Msgs name={name} socket={socket} />
      <Inputs socket={socket} name={name} />
    </div>
  )
}