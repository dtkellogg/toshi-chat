import React from 'react'
import Chat from './components/Chat';
import Login from './components/Login';
import { Routes, Route, useLocation } from 'react-router-dom'


function App() {
  const location = useLocation();


  return (
    <div className="container__main">
      <Routes location={location}>
        <Route path="/" element={<Login />} />
        <Route path="/chat" element={<Chat />} />
      </Routes>
    </div>
  );
}

export default App;