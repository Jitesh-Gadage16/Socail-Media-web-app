// src/components/Sidebar/Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUser, faCompass, faBell, faPlus, faSignInAlt, faUserPlus, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';

const Sidebar = () => {
    const { user, logout } = useAuth();

    return (
        <div className="sidebar h-full w-64 bg-gray-800 text-white flex flex-col p-4 hidden md:flex">
            <div className="sidebar__logo text-2xl font-bold mb-6">
                <Link to="/">Instagram</Link>
            </div>
            <nav className="sidebar__nav flex-1 text-white">
                <ul>
                    <li className="mb-4 text-white">
                        <Link to="/" className="flex items-center text-lg text-white">
                            <FontAwesomeIcon icon={faHome} className="mr-2" />
                            Home
                        </Link>
                    </li>

                    <li className="mb-4">
                        <Link to="/explore" className="flex items-center text-lg">
                            <FontAwesomeIcon icon={faCompass} className="mr-2" />
                            Explore
                        </Link>
                    </li>
                    <li className="mb-4">
                        <Link to="/notifications" className="flex items-center text-lg">
                            <FontAwesomeIcon icon={faBell} className="mr-2" />
                            Notifications
                        </Link>
                    </li>
                    {/* <li className="mb-4">
                        <Link to={`/profile/${user._id}`} className="flex items-center text-lg">
                            <FontAwesomeIcon icon={faUser} className="mr-2" />
                            Profile
                        </Link>
                    </li> */}
                    <li className="mb-4">
                        <Link to="/create-post" className="flex items-center text-lg">
                            <FontAwesomeIcon icon={faPlus} className="mr-2" />
                            Add Post
                        </Link>
                    </li>
                    {user ? (
                        <li className="mb-4">
                            <button onClick={logout} className="flex items-center w-full text-left text-lg">
                                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                                Logout
                            </button>
                        </li>
                    ) : (
                        <>
                            <li className="mb-4">
                                <Link to="/login" className="flex items-center text-lg">
                                    <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
                                    Login
                                </Link>
                            </li>
                            <li className="mb-4">
                                <Link to="/signup" className="flex items-center text-lg">
                                    <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
                                    Signup
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
            {user && (
                <div className="sidebar__profile mt-6 flex items-center">
                    <img src={user.profilePic} alt="Profile" className="w-12 h-12 rounded-full mr-2" />
                    <div>
                        <Link to={`/profile/${user._id}`} className="text-lg">{user.name}</Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Sidebar;
