// src/contexts/AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || '');

    const login = async (email, password) => {
        const response = await axios.post('http://localhost:3001/api/v1/login', { email, password });
        const { token, user } = response.data;
        setUser(user);
        setToken(token);
        localStorage.setItem('token', token);
    };

    const logout = () => {
        setUser(null);
        setToken('');
        localStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
