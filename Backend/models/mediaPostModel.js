const mongoose = require('mongoose');

// Define the schema for Instagram post
const postSchema = new mongoose.Schema({
  user: { // Reference to the user who created the post
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  caption: { // Caption for the post
    type: String,
    default: ''
  },
  image: { // URL or path to the image file
    type: String,
    default: ''
  },
  video: { // URL or path to the video file (for reels)
    type: String,
    default: ''
  },
  likes: [{ // Users who liked the post
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  comments: [{ // Comments on the post
    user: { // User who made the comment
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    text: String, // Comment text
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  createdAt: { // Timestamp of when the post was created
    type: Date,
    default: Date.now
  }
});

// Create the model from the schema
const Post = mongoose.model('Post', postSchema);

module.exports = Post;
