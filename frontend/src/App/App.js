import React from 'react'
import Chat from './components/Chat';
import Login from './components/Login';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom'
import { FaChevronLeft } from 'react-icons/fa'


function App() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    navigate('/');
  }

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
        <Route path="/" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </div>
  );
}

export default App;