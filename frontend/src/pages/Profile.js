import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { getProfile, toggleFollow } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

// Shimmer component
const Shimmer = () => (
    <div className="animate-pulse  rounded-full w-48 h-48"></div>
);

const ProfilePage = () => {
    const [profile, setProfile] = useState(null);
    const [posts, setPosts] = useState([]);
    const [isFollowing, setIsFollowing] = useState(false);
    const [followersCount, setFollowersCount] = useState(0);

    const { id } = useParams()
    console.log(id, "userId")

    const { user } = useAuth();
    console.log("user", user)

    useEffect(() => {
        // Fetch profile data
        const fetchProfile = async () => {
            try {
                const profileResponse = await getProfile(id);
                console.log("profileResponse", profileResponse)
                setProfile(profileResponse.profile);
                setPosts(profileResponse.profile.posts);
                setIsFollowing(profileResponse.profile.followers.includes(user._id));
                setFollowersCount(profileResponse.profile.followers.length);
            } catch (error) {
                console.error("Error fetching profile data:", error);
            }
        };



        fetchProfile();

    }, [id, user]);

    const handleFollowToggle = async () => {
        try {
            const updatedProfileResponse = await toggleFollow(id); // Call the new API function

            setIsFollowing(updatedProfileResponse.isFollowing); // Update follow status
            setFollowersCount(updatedProfileResponse.profile.followers.length);
        } catch (error) {
            console.error("Error toggling follow status:", error);
        }
    };

    if (!profile) {
        return (
            <div className="max-w-4xl mx-auto p-4 bg-slate-500 text-white">
                <div className="flex items-center space-x-6 mb-6">
                    <Shimmer /> {/* Shimmer effect for profile picture */}
                    <div>
                        <div className="flex items-center space-x-4">
                            <Shimmer /> {/* Shimmer effect for username */}
                            <Shimmer /> {/* Shimmer effect for follow button */}
                        </div>
                        <div className="flex space-x-6 mt-2">
                            <Shimmer /> {/* Shimmer effect for posts count */}
                            <Shimmer /> {/* Shimmer effect for followers count */}
                            <Shimmer /> {/* Shimmer effect for following count */}
                        </div>
                        <div className="mt-4">
                            <Shimmer /> {/* Shimmer effect for bio */}
                            <Shimmer /> {/* Shimmer effect for posts */}
                        </div>
                    </div>
                </div>
            </div>
        );
    }


    return (
        <div className="max-w-4xl mx-auto p-4 bg-gray-800 text-white">
            <div className="flex items-center space-x-6 mb-6">
                <img src={profile.profilePicture} alt="Profile" className="w-48 h-48 rounded-full" />
                <div>
                    <div className="flex items-center space-x-4">
                        <h2 className="text-2xl font-semibold">{profile.username}</h2>
                        {user._id !== id && (
                            <button
                                className="text-blue-500 hover:text-blue-600"
                                onClick={handleFollowToggle}
                            >
                                {isFollowing ? 'Unfollow' : 'Follow'}
                            </button>
                        )}
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
