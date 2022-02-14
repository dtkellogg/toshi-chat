import React, { useEffect, Suspense } from 'react'
import { TransitionGroup, CSSTransition } from "react-transition-group";
import { Routes, Route, useLocation } from 'react-router-dom'

import Login from './screens/Login';
import Chat from './screens/Chat';
import Loading from './components/Loading'
import UploadBtn from './components/UploadBtn';
import io from 'socket.io-client'

let socket 

function App() {
  const location = useLocation()

  useEffect(() => {
    const url = process.env.REACT_APP_ENV === 'development' ? "http://localhost:5000" : 'https://toshi-chat.herokuapp.com/'
    socket = io.connect(url)
    return () => socket.disconnect()
  }, [])


  return (
    <div className="main__container">
      <Suspense fallback={<Loading />}>
        <TransitionGroup>
          <CSSTransition timeout={250} classNames="fade" key={location.key}>
            <Routes location={location}>
              <Route exact path="/" element={<Login socket={socket}/>} />
              <Route path="/chat" element={<Chat socket={socket}/>} />
              <Route path="/upload" element={<UploadBtn />} />
              <Route path="*" element={<Login />} />
            </Routes>
          </CSSTransition>
          </TransitionGroup>
      </Suspense>
    </div>
  );
}

export default App;