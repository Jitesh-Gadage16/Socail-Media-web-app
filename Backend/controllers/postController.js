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
        if (!req.file) {
            return res.status(400).json({ message: 'File is required' });
        }
        const file = req.file.path; // Get temporary file path
        console.log("Uploaded file path:", file);

        // Upload file to Cloudinary
        const result = await uploadOnCloundinary(file);
        console.log("File uploaded to Cloudinary:", result);

        // Extract caption from request body
        const { caption } = req.body;
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
const getFollowedUsersPosts = async (req, res) => {
    try {
        const userId = req.user && req.user._id;

        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }
        const usersArray = await userModel.findById(userId, 'following');
        console.log("==>", usersArray.following);

        const followArray = usersArray.following;
        if (!followArray) {
            return res.status(404).json({ message: 'User not found' });
        }

        // const followedUserIds = userModel.followArray.map(followedUser => followedUser._id);
        const followedUserIds = followArray.map(objectId => objectId.toString());
        console.log("followedUserIds", followedUserIds)

        const posts = await postModel.find({ user: { $in: followedUserIds } })
            .populate('user', 'name email')  // Populate user details if needed
            .sort({ createdAt: -1 });       // Sort posts by creation date (latest first)

        return res.status(200).json({
            message: 'Posts from followed users retrieved successfully',
            posts
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

        const posts = await postModel.find()
            .populate('user', 'name email')  // Populate user details if needed
            .sort({ createdAt: -1 });        // Sort posts by creation date (latest first)

        return res.status(200).json({
            message: 'All posts retrieved successfully',
            posts
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Error retrieving posts',
            error: error.message
        });
    }
}

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
