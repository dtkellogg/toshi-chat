import React, { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { addToSockets } from '../actions/socketActions'
import NewMsg from './NewMsg'
import Msgs from './Msgs'
import Nav from './Nav'


export default function Chat({ socket }) {
  const { state: name } = useLocation()
  const msgRef = useRef()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { sockets } = useSelector((state) => state.sockets);
  // const {paymentMethod} = sockets;

  useEffect(() => {
    // localStorage.clear();
    if(!name || socket === undefined) {
      navigate('/')
    } else {
      socket.emit('new-user', name)
      // console.log('-----socket--------');
      // console.log(socket);
      dispatch(addToSockets(socket.id, name))
    }
  }, [])

  useEffect(() => {
    msgRef.current.focus()
  }, [sockets])


  return (
    <div className="chat__container">
      <Nav socket={socket} />
      <Msgs name={name} socket={socket} />
      <NewMsg socket={socket} name={name} msgRef={msgRef} />
    </div>
  )
}