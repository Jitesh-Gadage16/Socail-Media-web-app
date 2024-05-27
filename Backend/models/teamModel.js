const mongoose = require('mongoose');

// Define the schema for the team entity
const teamSchema = new mongoose.Schema({
    team_name: {
        type: String,
        required: true,
        unique: true
    },
    team_shortname: {
        type: String,
        required: true
    },
    organizer_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    team_city: {
        type: String,
        required: true
    },
    team_logo: {
        type: String,
    }
});

// Create the Team model
const Team = mongoose.model('Team', teamSchema);

module.exports = Team;
