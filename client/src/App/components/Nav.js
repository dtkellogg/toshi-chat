import React, { memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaChevronLeft, FaUserCircle, FaCog } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { v4 as uuid } from 'uuid';
import { modalToggleOpen } from "../actions/modalActions"



function Nav({ socket }) {
  const modalIsOpen = useSelector((state) => state.modalIsOpen);
  const { isOpen } = modalIsOpen;
  const userList = useSelector((state) => state.userList)
  const { loading, error, users } = userList

  const navigate = useNavigate()
  const dispatch = useDispatch()

  let numUsers = users.length

  const handleBackClick = (e) => {
    e.preventDefault();
    socket.emit('user-left')
    navigate('/');
  }

  const handleSettingsClick = (e) => {
    e.preventDefault();
    dispatch(modalToggleOpen(true))
  }


  console.log("LIST USERS")
  console.log(users)

  // if(numUsers > 0) {
    return (
      <nav className="container__chat--nav">
        <FaChevronLeft className="icon__back" onClick={(e) => handleBackClick(e)} aria-label="Back button" size={30} />
        {/* {users && ( */}
          <section className="container__nav--users">
            <section className="container__nav--user-icons">
              {/* {users.map(() =>  */}
              <FaUserCircle className="icon__circle" size={35} key={uuid()} />
              {/* // )} */}
            </section>
            <span className="text__nav--num-users">{`${users.length} ${users.length === 1 ? 'Person' : 'People'}`}</span>
          </section>
        {/* )} */}
        <FaCog className="icon__settings" onClick={(e) => handleSettingsClick(e)} aria-label="Back button" size={50} />
      </nav>
    )
  // } else return null
}

export default memo(Nav)