const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Story schema
const storySchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    media: {
        type: String, // URL or path to the media file
        required: true,
    },
    mediaType: {
        type: String, // 'image' or 'video'
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 86400, // Story expires after 24 hours (24 * 60 * 60 seconds)
    },
    views: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            viewedAt: { type: Date, default: Date.now },
        },
    ],
    reactions: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
            reactionType: { type: String }, // e.g., 'like', 'love', 'laugh', etc.
            reactedAt: { type: Date, default: Date.now },
        },
    ],
});

module.exports = mongoose.model("Story", storySchema);

