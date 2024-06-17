// src/App.js
import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import AddProfile from './pages/AddProfile';
// import AddPost from './components/Posts/AddPost';
// import Navbar from './components/Layout/Navbar';
import Sidebar from './components/Layout/Sidebar';
import CreatePostPage from './pages/CreatePost';
import BottomBar from './components/Layout/Bottombar';
import './App.css';

function App() {
  const location = useLocation();

  // Define the routes where you don't want to show the sidebar
  const noSidebarRoutes = ['/login', '/signup'];

  // Function to check if the current path includes any of the noSidebarRoutes
  const shouldShowSidebar = !noSidebarRoutes.some(route => location.pathname.startsWith(route));

  return (
    <div className="App">
      {/* Conditionally render Sidebar based on current route */}
      {shouldShowSidebar && <Sidebar className="hidden md:flex" />}
      <div className={`main-content bg-gray-800 text-white ${shouldShowSidebar ? '' : 'full-width'}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route path="/add-profile" element={<AddProfile />} />
          <Route path="/create-post" element={<CreatePostPage />} />
          {/* Add more routes as needed */}
        </Routes>
      </div>

      {shouldShowSidebar && <BottomBar className="md:hidden" />}
    </div>
  );
}


export default App;
