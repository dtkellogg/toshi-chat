import React, { useState, useEffect } from 'react'

export default function Msgs({ name, socket }) {
  const [msgs, setMsgs] = useState([])

  useEffect(() => {
    socket.on('msg', (msg, name, color) => {
      setMsgs((oldMsgs) => [...oldMsgs, {msg: msg, name: name, color: color, time: new Date().toLocaleTimeString()}]);
    })

    socket.on('new-user', (msg, color) => {
      console.log("MSG");
      console.log(msg);
      setMsgs((oldMsgs) => [...oldMsgs, {msg: msg, color: color, time: new Date().toLocaleTimeString()}]);
    })

    socket.on('user-gone', (msg, color) => {
      setMsgs((oldMsgs) => [...oldMsgs, {msg: msg, color: color, time: new Date().toLocaleTimeString()}]);
    })

    return (name) => socket.disconnect(name)
  }, [socket])

  useEffect(() => {
    var objDiv = document.getElementById("msg-container");
    objDiv.scrollTop = objDiv.scrollHeight;
  }, [msgs])

  // console.log('MSGS');
  // console.log(msgs);
  // console.log('NAME');
  // console.log(name);

  return (
    <div className="msg__container" id="msg-container">
      {msgs.map((m) => {
        // console.log('m.name === name');
        // console.log(m.name === name);

        return (
          (m.name === name) ? (
            <div className="msg__self" style={{'fontSize': '13px'}}>
              {/* <span className="" style={{'color': m.color}, {'fontWeight': 'bold'}}>{m.time}: </span> */}
              <span className="">{m.msg}</span>
            </div>
          ) : (
            <div className="msg__other" style={{'fontSize': '13px'}}>
              {/* <span className="" style={{'color': m.color}, {'fontWeight': 'bold'}}>{m.time}: </span> */}
              <span className="">{m.msg}</span>
            </div>
            
          )
        )
      })}
    </div>
  )
}




{/* <div className="msg">
  <span className="" style={{'color': m.color}, {'fontWeight': 'bold'}}>{m.time}: </span>
  <span className="" style={{'color': m.color}, {'fontWeight': 'bold'}}>{m.name.toUpperCase()}: </span>
  <span className="">{m.msg}</span>
  {/* {`${m.name}: ${m.msg}`}
</div> */}