// src/App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import AddPost from './components/Posts/AddPost';
// import Navbar from './components/Layout/Navbar';
import Sidebar from './components/Layout/Sidebar';
import './App.css';

function App() {
  return (
    <div className="App">
      {/* <Navbar /> */}
      <Sidebar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/add-post" element={<AddPost />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>
    </div>
  );
}

export default App;
