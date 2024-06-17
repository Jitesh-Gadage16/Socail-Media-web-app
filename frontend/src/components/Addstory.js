// src/components/Stories/AddStory.js

import React, { useState } from 'react';
import { uploadStory } from '../services/api';

const AddStory = ({ onStoryAdded }) => {
    const [file, setFile] = useState(null);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        if (!file) {
            return alert('Please select a file');
        }

        try {
            const formData = new FormData();
            formData.append('story', file);

            await uploadStory(formData);

            // Notify parent component that a new story has been added
            onStoryAdded();
        } catch (error) {
            console.error('Error uploading story:', error);
        }
    };

    return (
        <div className="flex flex-col items-center space-y-2 cursor-pointer">
            <label className="w-16 h-16 rounded-full border-2 border-gray-500 p-1 bg-gray-300 flex items-center justify-center">
                <span className="text-2xl font-bold">+</span>
                <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                />
            </label>
            <button onClick={handleUpload} className="text-sm text-white">
                Add Story
            </button>
        </div>
    );
};

export default AddStory;
