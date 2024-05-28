// src/components/Sidebar/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import './Sidebar.css';

const Sidebar = () => {
    const { user, logout } = useAuth();

    return (
        <div className="sidebar">
            <div className="sidebar__logo">
                <Link to="/">Instagram</Link>
            </div>
            <nav className="sidebar__nav">
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/profile">Profile</Link></li>
                    <li><Link to="/explore">Explore</Link></li>
                    <li><Link to="/notifications">Notifications</Link></li>
                    {user ? (
                        <li><button onClick={logout}>Logout</button></li>
                    ) : (
                        <>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/signup">Signup</Link></li>
                        </>
                    )}
                </ul>
            </nav>
            {user && (
                <div className="sidebar__profile">
                    <img src="path_to_profile_picture" alt="Profile" />
                    <p>{user.email}</p>
                </div>
            )}
        </div>
    );
};

export default Sidebar;
