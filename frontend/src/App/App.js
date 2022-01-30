import React, {useEffect} from 'react'
import Chat from './components/Chat';
import Login from './components/Login';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { FaChevronLeft } from 'react-icons/fa'
import io from 'socket.io-client'

let socket 

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    socket.emit('user-left')
    navigate('/');
  }

  useEffect(() => {
    socket = io.connect(process.env.REACT_APP_ENV === 'development' ? "http://localhost:5000" : 'https://toshi-chat.herokuapp.com/')
    return () => socket.disconnect()
  }, [])

  console.log(`location`);
  console.log(location);

  return (
    <div className="container__main">
      {location.pathname === '/chat' && 
        <button className="btn__back" onClick={(e) => handleClick(e)}>
          <FaChevronLeft className="icon__back" />
        </button>
      }

      <Routes location={location}>
        <Route path="/" element={<Login socket={socket}/>} />
        <Route path="/chat" element={<Chat socket={socket}/>} />
      </Routes>
    </div>
  );
}

export default App;