import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProfilePage = ({ userId }) => {
    const [profile, setProfile] = useState(null);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        // Fetch profile data
        const fetchProfile = async () => {
            try {
                const profileResponse = await axios.get(`/api/profile/${userId}`);
                setProfile(profileResponse.data);
            } catch (error) {
                console.error("Error fetching profile data:", error);
            }
        };

        // Fetch posts
        const fetchPosts = async () => {
            try {
                const postsResponse = await axios.get(`/api/posts/user/${userId}`);
                setPosts(postsResponse.data);
            } catch (error) {
                console.error("Error fetching posts:", error);
            }
        };

        fetchProfile();
        fetchPosts();
    }, [userId]);

    if (!profile) return <div>Loading...</div>;

    return (
        <div className="max-w-4xl mx-auto p-4">
            <div className="flex items-center space-x-6 mb-6">
                <img src={profile.profilePicture} alt="Profile" className="w-24 h-24 rounded-full" />
                <div>
                    <div className="flex items-center space-x-4">
                        <h2 className="text-2xl font-semibold">{profile.username}</h2>
                        <button className="text-blue-500 hover:text-blue-600">Follow</button>
                    </div>
                    <div className="flex space-x-6 mt-2">
                        <span><strong>{posts.length}</strong> posts</span>
                        <span><strong>{profile.followersCount}</strong> followers</span>
                        <span><strong>{profile.followingCount}</strong> following</span>
                    </div>
                    <p className="mt-4">{profile.bio}</p>
                </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
                {posts.map(post => (
                    <div key={post._id} className="aspect-w-1 aspect-h-1">
                        {post.image ? (
                            <img src={post.image} alt="Post" className="object-cover w-full h-full" />
                        ) : (
                            <video src={post.video} controls className="object-cover w-full h-full"></video>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProfilePage;
