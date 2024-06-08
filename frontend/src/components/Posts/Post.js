import React from 'react';

const Post = ({ profilePic, username, postImage, timestamp, postVideo, likesCount, onDoubleClick }) => {
    return (
        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden" onDoubleClick={onDoubleClick}>
            <div className="flex items-center px-4 py-3">
                <img className="h-8 w-8 rounded-full object-cover" src={profilePic} alt="profile" />
                <div className="ml-3">
                    <p className="text-gray-800 text-sm font-semibold">{username}</p>
                    <p className="text-gray-500 text-xs">{timestamp}</p>
                </div>
            </div>
            {postImage && (
                <img
                    src={postImage}
                    alt="Post"
                    className="object-cover w-full h-full rounded-lg transition-all duration-500 ease-in-out hover:opacity-90 hover:scale-110"

                />
            )}
            {postVideo && (
                <video
                    src={postVideo}
                    controls
                    className="object-cover w-full h-full rounded-lg transition-all duration-500 ease-in-out hover:opacity-90 hover:scale-110"

                ></video>
            )}
            <div className="p-4">
                <p className="text-gray-800 text-sm">
                    <strong>{username}</strong>
                </p>
                <div className="flex space-x-4 mt-2">
                    <div className="text-blue-500 hover:text-blue-600">{likesCount} <span onClick={onDoubleClick}>likes</span> </div>
                    <button className="text-blue-500 hover:text-blue-600">Comment</button>
                </div>
                {/* <div className="mt-2">
                    <p>{likesCount} likes</p>
                    <p className="text-gray-600 text-sm">{likesCount} {likesCount === 1 ? 'like' : 'likes'}</p>
                </div> */}
            </div>
        </div>
    );
};

export default Post;
