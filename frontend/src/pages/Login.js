import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login, user } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            if (user.profileCompleted) {
                navigate('/');
            } else {
                navigate('/add-profile');
            }
        } catch (err) {
            setError('Failed to log in');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <div className="mb-4 text-center">
                    <h1 className="text-3xl text-gray-900 font-bold font-pacifico">Instagram</h1>
                </div>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <input
                            type="text"
                            className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="Phone number, username, or email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <input
                            type="password"
                            className="w-full text-black px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600">Log in</button>
                    </div>
                </form>
                <div className="text-center mb-4">
                    <p className="text-gray-500">OR</p>
                </div>
                <div className="text-center mb-4">
                    <button className="flex items-center justify-center w-full border border-gray-300 py-2 rounded-lg text-blue-500 hover:bg-gray-100">
                        <img src='https://static-00.iconduck.com/assets.00/facebook-icon-2048x2048-3ss3dgti.png' alt='fb' className='h-5 w-5 mr-2' />
                        <span>Login with Facebook</span>
                    </button>
                </div>
                <div className="text-center mb-4">
                    <p className="text-blue-500 cursor-pointer">Forgotten your password?</p>
                </div>
                <div className="text-center mb-4">
                    <p className="text-gray-500">Don't have an account? <span className="text-blue-500 cursor-pointer">Sign up</span></p>
                </div>
                <div className="text-center">
                    <p className="text-gray-500 mb-2">Get the app.</p>
                    <div className="flex justify-center space-x-2">
                        <img className="h-10" src="https://static.cdninstagram.com/rsrc.php/v3/yz/r/c5Rp7Ym-Klz.png" alt="app link" />
                        <img className="h-10" src="https://static.cdninstagram.com/rsrc.php/v3/yu/r/EHY6QnZYdNX.png" alt="app link" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
