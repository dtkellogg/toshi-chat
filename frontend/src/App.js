import React, { useState, useEffect } from 'react'
import './App.css';
import io from 'socket.io-client'

const socket = io.connect('http://localhost:5000')

function App() {
  
  const [msg, setMsg] = useState("")
  const [name, setName] = useState("")
  const [msgs, setMsgs] = useState([])
  
  useEffect(() => {
    socket.emit('new-user')

    socket.on('msg', (msg, name, color) => {
      setMsgs((oldMsgs) => [...oldMsgs, {msg: msg, name: name, color: color, time: new Date().toLocaleTimeString()}]);
    })

    socket.on('new-user', (msg, color) => {
      setMsgs((oldMsgs) => [...oldMsgs, {msg: msg, color: color, time: new Date().toLocaleTimeString()}]);
    })

    socket.on('user-gone', (msg, color) => {
      setMsgs((oldMsgs) => [...oldMsgs, {msg: msg, color: color, time: new Date().toLocaleTimeString()}]);
    })

    return (name) => socket.disconnect(name)
  }, [])

  useEffect(() => {
    var objDiv = document.getElementById("msg-container");
    objDiv.scrollTop = objDiv.scrollHeight;
  }, [msgs])

  const handleSubmit = (e) => {
    e.preventDefault()
    socket.emit('chat', {msg, name})
    setMsg("")
  }

  const handleKeyPress = e => {
    //it triggers by pressing the enter key
    if (msg && e.charCode === 13) {
      handleSubmit(e);
    }
  };

  return (
    <div className="App">
      <div className="msg-container" id="msg-container">
        {msgs.map((m) => {
          return (
            Object.keys(m).length === 3 ? (
              <div className="msg" style={{'fontSize': '13px'}}>
                <span className="" style={{'color': m.color}, {'fontWeight': 'bold'}}>{m.time}: </span>
                <span className="" style={{'color': m.color, 'fontWeight': 'bold'}}>{m.msg}</span>
              </div>
            ) : (
              <div className="msg">
                <span className="" style={{'color': m.color}, {'fontWeight': 'bold'}}>{m.time}: </span>
                <span className="" style={{'color': m.color}, {'fontWeight': 'bold'}}>{m.name.toUpperCase()}: </span>
                <span className="">{m.msg}</span>
                {/* {`${m.name}: ${m.msg}`} */}
              </div>
            ))
        })}
      </div>
      <form className="inputs-container">
        <label className="input-label__name">Name: </label>
        <input className="input__name" placeholder="" onChange={e => setName(e.target.value)} value={name} />
        <label className="input-label__msg">Message: </label>
        <textarea className="input__msg" placeholder="" onChange={e => setMsg(e.target.value)} value={msg}
          onKeyPress={(e) => handleKeyPress(e)} type="text" rows="3"/>
      </form>
      <button disabled={!msg.length || !name.length} className="btn" type="submit" onClick={e => handleSubmit(e)}>Submit</button>
    </div>
  );
}

export default App;
