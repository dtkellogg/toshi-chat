import React, { useEffect } from 'react'
import { FaChevronLeft, FaUserCircle, FaCog } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { listUsers } from '../actions/userActions'
import { v4 as uuid } from 'uuid';


export default function Nav({ socket }) {
  const userList = useSelector((state) => state.userList)
  const { loading, error, users } = userList

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleClick = (e) => {
    e.preventDefault();
    socket.emit('user-left')
    navigate('/');
  }

  useEffect(() => {
    dispatch(listUsers())
  }, []) // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <nav className="container__chat--nav">
        <FaChevronLeft className="icon__back btn__back" onClick={(e) => handleClick(e)} aria-label="Back button"/>
      {users && (
        <section className="container__nav--users">
          <section className="container__nav--user-icons">
            {users.map(() => <FaUserCircle className="icon__circle" size={25} key={uuid()} />)}
          </section>
          <span className="text__nav--num-users">{`${users.length} People`}</span>
        </section>
      )}
      <FaCog className="icon__settings btn__settings" onClick={(e) => handleClick(e)} aria-label="Back button" size={25} />
    </nav>
  )
}