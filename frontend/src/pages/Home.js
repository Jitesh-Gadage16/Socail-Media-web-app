// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import { getPosts, fetchFollowedUsersPosts, likePost, fetchStories } from '../services/api';
import { useAuth } from '../contexts/AuthContext';
import Post from '../components/Posts/Post'
import Story from '../components/Story';
import Addstory from '../components/Addstory';
import StoryViewer from '../components/Storyviewer';

const Home = () => {
    const { user } = useAuth();
    console.log("user", user)
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stories, setStories] = useState([]);
    const [showStoryViewer, setShowStoryViewer] = useState(false);
    const [currentUserStories, setCurrentUserStories] = useState([]);
    const [loggedInUserStory, setLoggedInUserStory] = useState(null);
    const [otherStories, setOtherStories] = useState([]);


    useEffect(() => {
        const fetchPosts = async () => {
            try {
                let fetchedPosts;
                let fetchedStories;
                let otherUserStories;
                let userStory
                if (user) {
                    // Fetch posts from followed users if user is logged in
                    fetchedPosts = await fetchFollowedUsersPosts();
                    fetchedStories = await fetchStories();
                    if (stories) {
                        // Separate logged-in user's story from others
                        userStory = stories.find(storyGroup => storyGroup.user._id === user._id);
                        otherUserStories = stories.filter(storyGroup => storyGroup.user._id !== user._id);


                    }
                } else {
                    // Fetch all posts if user is not logged in
                    fetchedPosts = await getPosts();
                    fetchedStories = [];
                }
                // console.log("fetchedPosts", fetchedPosts.posts[0].likes)
                console.log("fetchedStories", userStory, otherUserStories)
                setPosts(fetchedPosts.posts);
                setLoggedInUserStory(userStory);
                setOtherStories(otherUserStories);
                // setStories(fetchedStories.stories);
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, [user, stories]);

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

    const handleStoryAdded = async () => {
        try {
            const fetchedStories = await fetchStories();
            setStories(fetchedStories.stories);
        } catch (error) {
            console.error('Error fetching stories:', error);
        }
    };

    const handleStoryClick = (userStories) => {
        console.log("click story")
        setCurrentUserStories(userStories);
        setShowStoryViewer(true);

    };

    const handleCloseStoryViewer = () => {
        setShowStoryViewer(false);
    };

    if (loading) {
        return <div className="flex items-center justify-center h-screen">Loading...</div>;
    }

    return (
        <div className="space-y-6 max-w-4xl mx-auto p-4 bg-gray-800 text-white">
            {(!loggedInUserStory || loggedInUserStory.storiesdata.length === 0) && (
                <Addstory onStoryAdded={handleStoryAdded} />
            )}

            {loggedInUserStory && (
                <Story
                    key={loggedInUserStory.user._id}
                    profilePic={loggedInUserStory.storiesdata[0].media}
                    username={loggedInUserStory.user.name}
                    onClick={() => handleStoryClick(loggedInUserStory.storiesdata)}
                />
            )}

            {otherStories.map(storyGroup => (
                <Story
                    key={storyGroup.user._id}
                    profilePic={storyGroup.storiesdata[0].media}
                    username={storyGroup.user.name}
                    onClick={() => handleStoryClick(storyGroup.storiesdata)}
                />
            ))}
            {/* {(stories && stories.length > 0) && (
                <div className="flex space-x-4 overflow-x-auto py-4">
                    <Addstory onStoryAdded={handleStoryAdded} />
                    {stories.map(storyGroup => (
                        <Story
                            key={storyGroup.user._id}
                            profilePic={storyGroup.storiesdata[0].media}
                            username={storyGroup.user.name}
                            onClick={() => handleStoryClick(storyGroup.storiesdata)}
                        />
                    ))}
                </div>
            )} */}
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
                    userID={post.user._id}
                    onDoubleClick={() => handleDoubleClick(post._id)}
                />
            ))}

            {showStoryViewer && (
                <StoryViewer
                    stories={currentUserStories}
                    onClose={handleCloseStoryViewer}
                />
            )}
        </div>
    );
};

export default Home;
