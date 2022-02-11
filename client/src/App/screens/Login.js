import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { listUsers } from '../actions/userActions'


export default function Login() {
  const [name, setName] = useState("")
  const [userExists, setUserExists] = useState(false)
  const nameRef = useRef();

  const userList = useSelector((state) => state.userList)
  const { loading, error, users } = userList

  const dispatch = useDispatch()


  const navigate = useNavigate()

  const handleKeyPress = e => {
    if (e.charCode === 13) {
      handleSubmit(e);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault()
    if(users.indexOf(name) !== -1) {
      setUserExists(true)
      setTimeout(() => {setUserExists(false)}, 3000)
      return
    }

    navigate('/chat', {state: name})
  }

  useEffect(()=>{
    nameRef.current.focus();
    // dispatch(listUsers())
  }, []);

  return (
    <div className="login__container">
      <h1 className="login__header">Toshi's Chat</h1>
      {userExists &&<span className="login__text--fail">The name {name} is already in use. Please pick another.</span> }
        <input className="input__name" placeholder="Name" onChange={e => setName(e.target.value)} onKeyPress={(e) => handleKeyPress(e)} value={name} ref={nameRef} />
      <button className="login__btn" disabled={!name} onClick={(e) => handleSubmit(e)} aria-label="Login">Login</button>
    </div>
  )
}