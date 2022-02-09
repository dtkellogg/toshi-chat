import React, { useEffect } from 'react'
import { FaChevronLeft, FaUserCircle, FaCog } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { v4 as uuid } from 'uuid';


export default function Nav({ socket, users }) {
  const navigate = useNavigate()
  let numUsers = users.length

  const handleClick = (e) => {
    e.preventDefault();
    socket.emit('user-left')
    navigate('/');
  }

  console.log("LIST USERS")
  console.log(users)

  if(users.length > 0) {
    return (
      <nav className="container__chat--nav">
        <FaChevronLeft className="icon__back btn__back" onClick={(e) => handleClick(e)} aria-label="Back button" size={15} />
        {users && (
          <section className="container__nav--users">
            <section className="container__nav--user-icons">
              {users.map(() => <FaUserCircle className="icon__circle" size={35} key={uuid()} />)}
            </section>
            <span className="text__nav--num-users">{`${numUsers} ${numUsers === 1 ? 'Person' : 'People'}`}</span>
          </section>
        )}
        <FaCog className="icon__settings btn__settings" onClick={(e) => handleClick(e)} aria-label="Back button" size={25} />
      </nav>
    )
  } else return null
}