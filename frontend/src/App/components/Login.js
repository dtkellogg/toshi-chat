import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [name, setName] = useState("")

  const navigate = useNavigate()

  const handleKeyPress = e => {
    // charCode13 is "enter"
    if (e.charCode === 13) {
      handleSubmit(e);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/chat', {state: name})
  }

  return (
    <div className="login__container">
      <h1 className="login__header">Toshi's Chat</h1>
      {/* <label className="input__label--name">Name: </label> */}
        <input className="input__name" placeholder="Name:" onChange={e => setName(e.target.value)} onKeyPress={(e) => handleKeyPress(e)} value={name} />
      <button className="login__btn" disabled={!name} onClick={(e) => handleSubmit(e)} aria-label="Login">Login</button>
    </div>
  )
}
