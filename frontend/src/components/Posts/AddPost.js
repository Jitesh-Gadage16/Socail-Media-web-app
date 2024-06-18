// src/components/CreatePost.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { addPostApi } from '../../services/api'



const CreatePost = ({ onPostCreated }) => {
    const [file, setFile] = useState(null);
    const [caption, setCaption] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);


    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setFile(selectedFile);
        console.log('Selected file:', selectedFile); // Log the selected file
    };

    const handleCaptionChange = (e) => {
        setCaption(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (!file) {
            setError('File is required');
            setLoading(false);
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('caption', caption);

        try {
            const response = await addPostApi(formData);

            console.log("response", response)

            onPostCreated(response.newPost);
            setCaption('');
            setFile(null);
            setLoading(false);
        } catch (error) {
            setError('Error creating post');
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <input type="file" onChange={handleFileChange} />
                </div>
                <div className="mb-4">
                    <textarea
                        placeholder="Write a caption..."
                        value={caption}
                        onChange={handleCaptionChange}
                        className="w-full px-3 py-2 border rounded-md"
                    ></textarea>
                </div>
                {error && <p className="text-red-500">{error}</p>}
                <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md" disabled={loading}>
                    {loading ? 'Posting...' : 'Post'}
                </button>
            </form>
        </div>
    );
};

export default CreatePost;
