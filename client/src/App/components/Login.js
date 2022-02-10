import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'
import Loader from "react-loader-spinner";


export default function Login() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  const { addToast } = useToasts()


  const navigate = useNavigate()

  const handleKeyPress = e => {
    if (e.charCode === 13) {
      handleSubmit(e);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmitting(true)

    navigate('/chat', {state: name})
  }

  useEffect(()=>{
    nameRef.current.focus();
  }, []);

  return (
    <div className="login__container">
      <h1 className="login__header">Toshi's Chat</h1>
      {/* <label className="input__label--name">Name: </label> */}
        <input className="input__name" placeholder="Name" onChange={e => setName(e.target.value)} onKeyPress={(e) => handleKeyPress(e)} value={name} ref={nameRef} />
      <button className="login__btn" disabled={!name} onClick={(e) => handleSubmit(e)} aria-label="Login">Login</button>
    </div>
  )
}