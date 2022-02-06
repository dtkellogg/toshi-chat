import React, { useState, useEffect, useRef } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'
import Loader from "react-loader-spinner";


export default function Login() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitting, setSubmitting] = useState(false)
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
    // emailRef.current.focus();
  }, []);

  return (
    <div className="login__container">
      <h1 className="login__header">Toshi's Chat</h1>
      {/* <label className="input__label--name">Name: </label> */}
        <input className="input__name" placeholder="Name" onChange={e => setName(e.target.value)} onKeyPress={(e) => handleKeyPress(e)} value={name} />
      <button className="login__btn" disabled={!name} onClick={(e) => handleSubmit(e)} aria-label="Login">Login</button>
    </div>
  )

  // return (
  //   <form className="container__login" onSubmit={(e) => handleSubmit(e)}>
  //     <h1 className="header__login">Welcome Back!</h1>
  //     <section className="container__inputs">
  //       <label className="label__email" htmlFor="input-email">Email:</label>
  //       <input className="input__email" name="email" type="email" id="input-email" value={email} placeholder="Email" onChange={(e) => setEmail(e.target.value)} ref={emailRef}/>
  //       <label className="label__password" htmlFor="input-password">Password:</label>
  //       <input className="input__password" name="password" type="password" id="input-password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} ref={passwordRef}/>
  //       <a className="link__forgot-password">Forgot password?</a>
  //     </section>
  //     <button className="btn__login" type="submit" disabled={submitting}>
  //       {!submitting ? (
  //         "Login"
  //         ) : (
  //         <Loader
  //           type="TailSpin"
  //           color="white"
  //           height={25}
  //           width={30}
  //           className={"contact__loader"}
  //         />
  //       )}
  //     </button>
  //     <span className="to-register">Need an account? <Link className="link__register" to="register">Register</Link></span>
  //   </form>
  // )
}