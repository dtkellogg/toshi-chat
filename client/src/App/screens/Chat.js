import React, { useEffect, useRef } from 'react'
import { useLocation, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { listUsers, addToUsers } from '../actions/userActions'
import MsgInput from '../components/MsgInput'
import Msgs from '../components/Msgs'
import Nav from '../components/Nav'
import Modal from '../components/Modal'


export default function Chat({ socket }) {
  const { state: name } = useLocation()
  const modalIsOpen = useSelector((state) => state.modalIsOpen);
  const { isOpen } = modalIsOpen;
  const msgRef = useRef()
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    if(!name || socket === undefined) {
      navigate('/')
    } else {
      console.log(`socket: ${socket}`)
      console.log(socket.id)
      dispatch(addToUsers(socket.id, name))
      socket.emit('new-user', name)
      dispatch(listUsers())
    }

  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    msgRef.current.focus()
  }, [])


  return (
    <div className="chat__container">
      <Nav socket={socket} />
      <Msgs name={name} socket={socket} />
      <MsgInput socket={socket} name={name} msgRef={msgRef} />
      { isOpen && <Modal /> }
    </div>
  )
}