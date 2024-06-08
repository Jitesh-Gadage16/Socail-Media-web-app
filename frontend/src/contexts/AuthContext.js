// src/contexts/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(localStorage.getItem('token') || '');

    useEffect(() => {
        // If there's a token in local storage, set the authorization header
        if (token) {
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            const storedUser = JSON.parse(localStorage.getItem('user'));
            if (storedUser) setUser(storedUser);
        } else {
            delete axios.defaults.headers.common['Authorization'];
        }
    }, [token]);

    const login = async (email, password) => {
        try {
            const response = await axios.post('http://localhost:3001/api/v1/login', { email, password });
            const { token, user } = response.data;
            setUser(user);
            setToken(token);
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        } catch (err) {
            console.error('Login error:', err);
            throw new Error('Failed to log in');
        }
    };

    const logout = () => {
        setUser(null);
        setToken('');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        delete axios.defaults.headers.common['Authorization'];
    };

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
