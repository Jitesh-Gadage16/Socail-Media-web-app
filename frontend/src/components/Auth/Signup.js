// components/Auth/Signup.js
import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signup } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signup({ name, email, password });
        } catch (error) {
            console.error('Failed to sign up', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Name"
                value={name}
                className='text-black'
                onChange={(e) => setName(e.target.value)}
                required
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                className='text-black'
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                className='text-black'
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit">Signup</button>
        </form>
    );
};

export default Signup;
