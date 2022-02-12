import React, { memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaChevronRight, FaChevronLeft, FaChevronDown, FaUserCircle, FaCog } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { v4 as uuid } from 'uuid';
import { modalToggleOpen } from "../actions/modalActions"
import { removeFromUsers, listUsers } from "../actions/userActions"



function Nav({ name, socket }) {
  const userList = useSelector((state) => state.userList)
  const { loading, error, users } = userList

  const deleteFromUsers = useSelector((state) => state.deleteFromUsers)
  const { loading: deleteUserLoading, success: deleteUserSuccess, error: deleteUserError } = deleteFromUsers

  const navigate = useNavigate()
  const dispatch = useDispatch()


  const handleBackClick = (e) => {
    e.preventDefault();
    dispatch(removeFromUsers(socket.id))
    socket.emit('user-left', name)
    navigate('/');
  }

  const handleSettingsClick = (e) => {
    e.preventDefault();
    dispatch(modalToggleOpen(true))
  }

  useEffect(() => {
    console.log(`deleteUserSuccess: ${deleteUserSuccess}`)
    if(deleteUserSuccess) {
      dispatch(listUsers())
    };
  }, [deleteUserSuccess])

  return (
    <nav className="nav__container">
      <FaChevronLeft className="icon__back" onClick={(e) => handleBackClick(e)} aria-label="Back button" size={30} />
        <section className="nav__container--users">
          <section className="nav__container--user-info">
            <FaUserCircle className="icon__circle" size={35} key={uuid()} />
          </section>
          <details className="nav__container--details">
            <summary className="nav__details--summary">
              <span className="nav__details--num-users">{`${users.length} ${users.length === 1 ? 'Person' : 'People'}`}</span>
              <FaChevronRight className="icon__right" aria-label="Open users list button" size={10} />
              </summary>
            <p className="nav__details--users">{[...users].join(", ")}</p>
          </details>
        </section>
      <FaCog className="icon__settings" onClick={(e) => handleSettingsClick(e)} aria-label="Back button" size={50} />
    </nav>
  )
}

export default memo(Nav)