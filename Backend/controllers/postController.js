const profileModel = require('../models/profileModel')
const postModel = require('../models/mediaPostModel.js')
const userModel = require('../models/userModel.js')
const { uploadOnCloundinary } = require('../service/imageUpload.js');
const mongoose = require('mongoose');

// createPost
const createPost = async (req, res) => {

    try {

        const userId = req.user._id; // Assuming you have user authentication middleware
        console.log(userId);

        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }
        // Check if file is uploaded
        // if (!req.file) {
        //     return res.status(400).json({ message: 'File is required' });
        // }
        // const file = req.file.path; // Get temporary file path
        // console.log("Uploaded file path:", file);
        // Extract caption from request body
        const { caption, data } = req.body;
        console.log(data);

        // Upload file to Cloudinary
        const result = await uploadOnCloundinary(data);
        console.log("File uploaded to Cloudinary:", result);


        console.log("Caption:", caption);

        // Determine if the file is an image or a video
        // console.log("File type:", result.resource_type);

        const newPost = new postModel({
            user: userId,
            caption,
            image: result.resource_type === 'image' ? result.secure_url : "",
            video: result.resource_type === 'video' ? result.secure_url : ""
        });

        await newPost.save();

        console.log("newPost", newPost)

        // Respond with success
        return res.status(200).json({
            message: 'Post created successfully',
            newPost,
            success: true
        });




    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error in post creation",
            error: error.message
        });
    }


}
//Like Post
const likePost = async (req, res) => {
    try {
        const userId = req.user._id; // Assuming you have user authentication middleware

        const postId = req.params.id; // Assuming the tournament ID is passed in the request params

        console.log("=>", userId, postId)

        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const post = await postModel.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const isLiked = post.likes.includes(userId);
        console.log("isLiked", isLiked)

        if (isLiked) {
            post.likes.pull(userId);
        } else {
            post.likes.push(userId);
        }

        await post.save();
        return res.status(200).json({ message: isLiked ? 'Post unliked successfully' : 'Post liked successfully', post });


    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Error liking/unliking the post',
            error: error.message
        });
    }
};
//get following users posts
// Get posts from followed users
const getFollowedUsersPosts = async (req, res) => {
    try {
        const userId = req.user && req.user._id;

        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        // Fetch the user's following array
        const user = await userModel.findById(userId, 'following');
        if (!user || !user.following) {
            return res.status(404).json({ message: 'User not found or no following users' });
        }

        const followedUserIds = user.following.map(objectId => objectId.toString());
        console.log("Followed User IDs:", followedUserIds);

        // Fetch profiles of followed users
        const profiles = await profileModel.find({ userID: { $in: followedUserIds } });
        console.log("Profiles:", profiles);

        // Create a map of userID to profile picture for quick lookup
        const profileMap = {};
        profiles.forEach(profile => {
            profileMap[profile.userID] = profile.profilePicture; // Assuming profilePicture is an array
        });

        // Fetch posts of followed users
        const posts = await postModel.find({ user: { $in: followedUserIds } })
            .populate('user', 'name email') // Populate user details if needed
            .sort({ createdAt: -1 }); // Sort posts by creation date (latest first)

        // Attach profile pictures to posts
        const formattedPosts = posts.map(post => ({
            ...post.toObject(),
            user: {
                ...post.user.toObject(),

            },
            profilePicture: profileMap[post.user._id] ? profileMap[post.user._id][0] : null
        }));

        return res.status(200).json({
            message: 'Posts from followed users retrieved successfully',
            posts: formattedPosts
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Error retrieving posts',
            error: error.message
        });
    }
};


//get all users post
const getAllUserPost = async (req, res) => {
    try {
        // Fetch all posts and populate user details
        const posts = await postModel.find()
            .populate('user', 'name email userID _id')
            .sort({ createdAt: -1 }); // Sort posts by creation date (latest first)

        // Extract all user IDs from the posts
        const userIDs = posts.map(post => post.user.userID);

        // Fetch all profiles in one go using the extracted user IDs
        const profiles = await profileModel.find({ userID: { $in: userIDs } });


        // Create a map of userID to profile for quick lookup
        const profileMap = {};
        profiles.forEach(profile => {
            profileMap[profile.userID] = profile.profilePicture; // Assuming profilePicture is an array
        });

        // Add profile pictures to posts
        const formattedPosts = posts.map(post => ({
            ...post.toObject(),
            user: {
                ...post.user.toObject(),

            },
            profilePicture: profileMap[post.user.userID] ? profileMap[post.user.userID][0] : null
        }));

        return res.status(200).json({
            message: 'All posts retrieved successfully',
            posts: formattedPosts,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Error retrieving posts',
            error: error.message
        });
    }
};


// Add a comment to a post
const addComment = async (req, res) => {
    try {
        const userId = req.user._id;
        const { postId } = req.params;
        const { commentText } = req.body;

        // Debugging logs to ensure data is being received
        console.log("Received commentText:", commentText);
        console.log("Received postId:", postId);

        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.status(400).json({ message: 'Invalid post ID' });
        }

        const post = await postModel.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Ensure commentText is not empty or undefined
        if (!commentText) {
            return res.status(400).json({ message: 'Comment text is required' });
        }

        const commentObject = {
            user: userId,
            text: commentText,
            createdAt: new Date()
        };

        // Logging the comment object before adding it to the post
        console.log("Comment object:", commentObject);

        post.comments.push(commentObject);

        // Logging the post object after adding the comment
        console.log("Post object with new comment:", post);

        await post.save();

        return res.status(200).json({
            message: 'Comment added successfully',
            post
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Error adding comment',
            error: error.message
        });
    }
};



module.exports = { createPost, likePost, getFollowedUsersPosts, getAllUserPost, addComment };
