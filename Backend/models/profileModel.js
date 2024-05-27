const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
        },
        userID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        username: {
            type: String,
            required: true,
            trim: true,
            unique: true,
        },

        bio: {
            type: String,
            required: true,
            trim: true,
        },

        profilePicture: [
            {
                type: String,
                required: "",
            },
        ],


    },
    { timestamps: true }
);

module.exports = mongoose.model("profile", profileSchema);

