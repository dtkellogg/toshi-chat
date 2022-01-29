import React, { useState } from 'react'
import { FaArrowAltCircleUp } from "react-icons/fa";

export default function NewMsg({ socket, name }) {
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
        <input className="input__msg" placeholder="message:" onChange={e => setMsg(e.target.value)} value={msg} onKeyPress={(e) => handleKeyPress(e)} type="text" rows="3" />
          <button disabled={!msg.length || !name.length} className="chat__btn" type="submit" onClick={e => handleSubmit(e)}>
            <FaArrowAltCircleUp className="msg__input--btn" />
          </button>
      </form>
  )
}