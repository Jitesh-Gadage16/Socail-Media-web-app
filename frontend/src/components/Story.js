// src/components/Stories/Story.js

import React from 'react';

const Story = ({ profilePic, username, onClick }) => {
    return (
        <div className="story" onClick={onClick}>
            <img src={profilePic} alt={`${username}'s profile`} className="rounded-full h-16 w-16" />
            <p className="text-center">{username}</p>
        </div>
    );
};

export default Story;
