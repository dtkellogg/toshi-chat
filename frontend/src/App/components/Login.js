import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {
  const [name, setName] = useState("")

  const navigate = useNavigate()
  
  const handleClick = (e) => {
    e.preventDefault()
    navigate('/chat', {state: name})
  }

  return (
    <div className="login__container">
      <h1 className="login__header">Toshi's Chat</h1>
      <label className="input__label--name">Name: </label>
        <input className="input__name" placeholder="" onChange={e => setName(e.target.value)} value={name} />
      <button className="login__btn"  onClick={(e) => handleClick(e)}>Login</button>
    </div>
  )
}
