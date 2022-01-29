import React, { useState } from 'react'

export default function Inputs({ socket, name }) {
  const [msg, setMsg] = useState("")

  const handleKeyPress = e => {
    // charCode13 is "enter"
    if (msg && e.charCode === 13) {
      handleSubmit(e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    socket.emit('chat', {msg, name})
    setMsg("")
  }

  return (
      <form className="msg__input--container">
        <textarea className="input__msg" placeholder="message:" onChange={e => setMsg(e.target.value)}    value={msg} onKeyPress={(e) => handleKeyPress(e)} type="text" rows="3"/>
        <button disabled={!msg.length || !name.length} className="chat__btn" type="submit" onClick={e => handleSubmit(e)}>Submit</button>
      </form>
  )
}
