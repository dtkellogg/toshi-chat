import React, { memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaChevronLeft, FaUserCircle, FaCog } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { v4 as uuid } from 'uuid';
import { modalToggleOpen } from "../actions/modalActions"
import { removeFromUsers, listUsers } from "../actions/userActions"



function Nav({ socket }) {
  const userList = useSelector((state) => state.userList)
  const { loading, error, users } = userList

  const navigate = useNavigate()
  const dispatch = useDispatch()


  const handleBackClick = async (e) => {
    e.preventDefault();
    let res = await dispatch(removeFromUsers(socket.id))
    socket.emit('user-left', res)
    navigate('/');
  }

  const handleSettingsClick = (e) => {
    e.preventDefault();
    dispatch(modalToggleOpen(true))
  }

  return (
    <nav className="nav__container">
      <FaChevronLeft className="icon__back" onClick={(e) => handleBackClick(e)} aria-label="Back button" size={30} />
        <section className="nav__container--users">
          <section className="nav__container--user-info">
            <FaUserCircle className="icon__circle" size={35} key={uuid()} />
          </section>
          <details className="nav__span--num-users">
            <summary>{`${users.length} ${users.length === 1 ? 'Person' : 'People'}`}</summary>
            <p>{[...users].join(", ")}</p>
          </details>
        </section>
      <FaCog className="icon__settings" onClick={(e) => handleSettingsClick(e)} aria-label="Back button" size={50} />
    </nav>
  )
}

export default memo(Nav)