// src/components/Layout/BottomBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faCompass, faBell, faPlus, faSignInAlt, faUserPlus, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './BottomBar.css';

const BottomBar = () => {
    const { user, logout } = useAuth();

    return (
        <div className="bottom-bar fixed bottom-0 w-full bg-gray-800 text-white flex justify-around py-2 md:hidden">
            <Link to="/" className="flex flex-col items-center text-sm">
                <FontAwesomeIcon icon={faHome} />
                <span>Home</span>
            </Link>
            <Link to="/explore" className="flex flex-col items-center text-sm">
                <FontAwesomeIcon icon={faCompass} />
                <span>Explore</span>
            </Link>
            <Link to="/create-post" className="flex flex-col items-center text-sm">
                <FontAwesomeIcon icon={faPlus} />
                <span>Add Post</span>
            </Link>
            {/* <Link to="/notifications" className="flex flex-col items-center text-sm">
                <FontAwesomeIcon icon={faBell} />
                <span>Notifications</span>
            </Link> */}
            {user ? (
                <>
                    <Link to={`/profile/${user._id}`} className="flex flex-col items-center text-sm">
                        <img src={user.profilePic} alt="Profile" className="w-8 h-8 rounded-full mr-2" />
                    </Link>
                    <button onClick={logout} className="flex flex-col items-center text-sm">
                        <FontAwesomeIcon icon={faSignOutAlt} />
                        <span>Logout</span>
                    </button>
                </>
            ) : (
                <Link to="/login" className="flex flex-col items-center text-sm">
                    <FontAwesomeIcon icon={faSignInAlt} />
                    <span>Login</span>
                </Link>
            )}
        </div>
    );
};

export default BottomBar;
