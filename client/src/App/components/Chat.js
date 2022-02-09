import React, { useState, useEffect, useRef } from 'react'
import { useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { addToSockets } from '../actions/socketActions'
import { listUsers } from '../actions/userActions'
import NewMsg from './NewMsg'
import Msgs from './Msgs'
import Nav from './Nav'
import Modal from './Modal'



export default function Chat({ socket }) {
  const { state: name } = useLocation()
  const msgRef = useRef()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { sockets } = useSelector((state) => state.sockets);
  // const {paymentMethod} = sockets;

  const userList = useSelector((state) => state.userList)
  const { loading, error, users } = userList

  const modalIsOpen = useSelector((state) => state.modalIsOpen);
  const { isOpen } = modalIsOpen;

  useEffect(() => {
    if(!name || socket === undefined) {
      navigate('/')
    } else {
      socket.emit('new-user', name)
      dispatch(addToSockets(socket.id, name))
    }
    dispatch(listUsers())

  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    msgRef.current.focus()
  }, [sockets])


  return (
    <div className="chat__container">
      <Nav socket={socket} users={users} />
      <Msgs name={name} socket={socket} />
      <NewMsg socket={socket} name={name} msgRef={msgRef} />
      { isOpen && <Modal /> }
    </div>
  )
}