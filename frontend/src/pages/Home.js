// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import { getPosts, fetchFollowedUsersPosts, likePost } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import Post from '../components/Posts/Post'

const Home = () => {
    const { user } = useAuth();
    console.log("user", user)
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                let fetchedPosts;
                if (user) {
                    // Fetch posts from followed users if user is logged in
                    fetchedPosts = await fetchFollowedUsersPosts();
                } else {
                    // Fetch all posts if user is not logged in
                    fetchedPosts = await getPosts();
                }
                console.log("fetchedPosts", fetchedPosts.posts[0].likes)
                setPosts(fetchedPosts.posts);
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [user]);

    const handleDoubleClick = async (postId) => {
        console.log("clicked")
        try {
            await likePost(postId);
            // Optionally update the post state to reflect the like
            setPosts(posts.map(post =>
                post._id === postId ? { ...post, liked: true } : post
            ));
        } catch (error) {
            console.error('Error liking post:', error);
        }
    };

    if (loading) {
        return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }

    return (
        <div className="space-y-6 max-w-4xl mx-auto p-4 bg-gray-800 text-white">
            {posts.map(post => (
                <Post
                    key={post._id}
                    profilePic={post.profilePicture}
                    username={post.user.name}
                    timestamp={new Date(post.createdAt).toLocaleString()}
                    caption={post.caption}
                    postImage={post.image}
                    postVideo={post.video}
                    tags={post.tags}
                    likesCount={post.likes.length}
                    onDoubleClick={() => handleDoubleClick(post._id)}
                />
            ))}
        </div>
    );
};

export default Home;
