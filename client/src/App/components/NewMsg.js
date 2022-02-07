import React, { useState } from 'react'
import { FaArrowAltCircleUp } from "react-icons/fa";

export default function NewMsg({ socket, name, msgRef }) {
  const [msg, setMsg] = useState("")

  const handleKeyPress = e => {
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
      <input className="input__msg" placeholder="message" onChange={e => setMsg(e.target.value)} value={msg} onKeyPress={(e) => handleKeyPress(e)} ref={msgRef} type="text" rows="3" />
        <button disabled={!msg.length || !name.length} className="chat__btn" type="submit" onClick={e => handleSubmit(e)} aria-label="Send Message">
          <FaArrowAltCircleUp className="msg__input--btn" size={30} name="send-msg"/>
        </button>
    </form>
  )
}