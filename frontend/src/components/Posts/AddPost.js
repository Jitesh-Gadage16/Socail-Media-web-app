import React, { useState } from 'react';
// import Alert from '../components/Alert';
import axios from 'axios';
import { createPost } from '../../services/api'

const CreatePost = ({ onPostCreated }) => {
    const [fileInputState, setFileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);
    const [caption, setCaption] = useState('');
    const [successMsg, setSuccessMsg] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [loading, setLoading] = useState(false);

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        previewFile(file);
        setSelectedFile(file);
        setFileInputState(e.target.value);
    };

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        };
    };

    const handleCaptionChange = (e) => {
        setCaption(e.target.value);
    };

    const handleSubmitFile = async (e) => {
        e.preventDefault();
        if (!selectedFile) {
            setErrMsg('File is required');
            return;
        }
        setLoading(true);
        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = async () => {
            try {
                const result = await createPost(reader.result, caption);
                setSuccessMsg('Post created successfully');
                setFileInputState('');
                setPreviewSource('');
                setCaption('');
                setSelectedFile(null);
                setLoading(false);
                onPostCreated(result.newPost);
            } catch (err) {
                console.error(err);
                setErrMsg('Error creating post');
                setLoading(false);
            }
        };
        reader.onerror = () => {
            setErrMsg('Something went wrong!');
            setLoading(false);
        };
    };


    // const uploadImage = async (base64EncodedImage, caption) => {

    //     console.log(base64EncodedImage, "caption", caption)
    //     try {
    //         const response = await fetch('http://localhost:3001/api/v1/createPost', {
    //             method: 'POST',
    //             body: JSON.stringify({ data: base64EncodedImage, caption: caption }),
    //             headers: { 'Content-Type': 'application/json' },
    //         });
    //         const data = await response.json();
    //         console.log("data", data)
    //         return data;
    //     } catch (err) {
    //         console.error(err);
    //         throw new Error('Error uploading image');
    //     }
    // };

    // const createPost = async (imageUrl, caption) => {
    //     try {
    //         const response = await axios.post('/api/v1/create-post', {
    //             image: imageUrl,
    //             caption,
    //         });
    //         return response.data.newPost;
    //     } catch (err) {
    //         console.error(err);
    //         throw new Error('Error creating post');
    //     }
    // };

    return (
        <div className="max-w-md mx-auto bg-white p-6 rounded-md shadow-md">
            <h1 className="text-xl mb-4">Create a Post</h1>

            <form onSubmit={handleSubmitFile} className="form">
                <div className="mb-4">
                    <input
                        id="fileInput"
                        type="file"
                        name="image"
                        onChange={handleFileInputChange}
                        value={fileInputState}
                        className="form-input"
                    />
                </div>
                <div className="mb-4">
                    <textarea
                        placeholder="Write a caption..."
                        value={caption}
                        onChange={handleCaptionChange}
                        className="w-full px-3 py-2 border rounded-md"
                    ></textarea>
                </div>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md" type="submit" disabled={loading}>
                    {loading ? 'Posting...' : 'Post'}
                </button>
            </form>
            {previewSource && (
                <img
                    src={previewSource}
                    alt="chosen"
                    style={{ height: '300px' }}
                />
            )}
        </div>
    );
};

export default CreatePost;
