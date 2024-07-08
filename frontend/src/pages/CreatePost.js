// src/pages/CreatePostPage.jsx
import React, { useState } from 'react';
import CreatePost from '../components/Posts/AddPost';

const CreatePostPage = () => {
    const [posts, setPosts] = useState([]);

    const handlePostCreated = (newPost) => {
        setPosts([newPost, ...posts]);
    };

    return (
        <div>
            <CreatePost onPostCreated={handlePostCreated} />
            {/* <div className="grid grid-cols-3 gap-4 mt-8">


                {posts.map((post) => (

                    <div key={post._id} className="p-4 border rounded-md shadow-md bg-white">
                        {console.log(post, "sss")}
                        {post.image && <img src={post.image} alt="Post" className="object-cover w-full h-full rounded-lg" />}
                        {post.video && <video src={post.video} controls className="object-cover w-full h-full rounded-lg"></video>}
                        <p>{post.caption}</p>
                    </div>
                ))}
            </div> */}
        </div>
    );
};

export default CreatePostPage;
