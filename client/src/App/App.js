import React, { useEffect, Suspense } from 'react'
import { TransitionGroup, CSSTransition } from "react-transition-group";

import Loading from './components/Loading'
import Chat from './components/Chat';
import Upload from './components/Upload';
import Login from './components/Login';
import Register from './components/Register';
import { Routes, Route, useLocation } from 'react-router-dom'
import io from 'socket.io-client'

let socket 

function App() {
  const location = useLocation()

  useEffect(() => {
    socket = io.connect(process.env.REACT_APP_ENV === 'development' ? "http://localhost:5000" : 'https://toshi-chat.herokuapp.com/')
    return () => socket.disconnect()
  }, [])


  return (
    <div className="container__main">
      <Suspense fallback={<Loading />}>
        <TransitionGroup>
          <CSSTransition timeout={250} classNames="fade" key={location.key}>
            <Routes location={location}>
              <Route exact path="/" element={<Login socket={socket}/>} />
              <Route path="/register" element={<Register socket={socket}/>} />
              <Route path="/chat" element={<Chat socket={socket}/>} />
              <Route path="/upload" element={<Upload/>} />
            </Routes>
          </CSSTransition>
          </TransitionGroup>
      </Suspense>
    </div>
  );
}

export default App;