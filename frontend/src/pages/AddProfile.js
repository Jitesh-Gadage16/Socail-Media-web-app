// src/components/Auth/AddProfile.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const AddProfile = () => {
    const [profilePic, setProfilePic] = useState(null);
    const [bio, setBio] = useState('');
    const [username, setUsername] = useState('');
    const { user } = useAuth();
    const navigate = useNavigate();

    const handleProfilePicChange = (e) => {
        setProfilePic(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('profilePic', profilePic);
        formData.append('bio', bio);
        formData.append('username', username);
        formData.append('name', user.name);

        try {
            await axios.post('https://socail-media-web-app.vercel.app/api/v1/add-profile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            navigate('/'); // Redirect to home page after successful profile creation
        } catch (error) {
            console.error('Failed to add profile', error);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-2xl font-bold mb-4 text-center">Add Profile</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Profile Picture</label>
                        <input
                            type="file"
                            onChange={handleProfilePicChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Bio</label>
                        <textarea
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            placeholder="Tell us about yourself"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                            placeholder="Username"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                    >
                        Save Profile
                    </button>
                </form>
            </div>
        </div>
    );
};

export default AddProfile;
