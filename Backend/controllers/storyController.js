const profileModel = require('../models/profileModel')
const storyModel = require('../models/storyModel.js')
const userModel = require('../models/userModel.js')
const { uploadOnCloundinary } = require('../service/imageUpload.js');
const mongoose = require('mongoose');

// createPost
const createStory = async (req, res) => {

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

        // // Extract caption from request body
        // const { caption } = req.body;
        // console.log("Caption:", caption);

        // Determine if the file is an image or a video
        // console.log("File type:", result.resource_type);

        const newStory = new storyModel({
            user: userId,
            media: result.secure_url,
            mediaType: result.resource_type

        });

        await newStory.save();

        // Respond with success
        return res.status(200).json({
            message: 'Story created successfully',
            newStory,
            success: true
        });




    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: "Error in story creation",
            error: error.message
        });
    }


}

const viewStory = async (req, res) => {
    try {
        const { storyId } = req.params;
        const userId = req.user._id; // Assuming you have user authentication middleware
        console.log(userId, storyId);

        if (!userId) {
            return res.status(401).json({ message: 'User not authenticated' });
        }

        const story = await storyModel.findById(storyId);

        if (!story) {
            return res.status(404).json({ message: 'Story not found' });
        }

        // Check if the user has already viewed the story
        const hasViewed = story.views.some(view => view.user.toString() === userId.toString());

        if (!hasViewed) {
            story.views.push({ user: userId });
            await story.save();
        }

        res.status(200).json({ message: 'Story viewed successfully', viewsCount: story.views.length });


    } catch (error) {
        console.error(error);
        res.status(500).send({
            success: false,
            message: 'Error in viewing story',
            error: error.message,
        });
    }
}

module.exports = { createStory, viewStory };
