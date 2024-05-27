const mongoose = require('mongoose');

const tournamentSchema = new mongoose.Schema({
    tournamentName: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    groundName: {
        type: String,
        required: true
    },
    organiserName: {
        type: Object,
        trim: true,
    },
    organiserPhoneNumber: {
        type: String,
        required: true
    },
    startDate: {
        type: String,
        // required: true
    },
    endDate: {
        type: String,
        // required: true
    },
    matchType: {
        type: String,  
        enum: ['open', 'cooperate', 'community', 'school', 'Box', 'series', 'other'],
        required: true
    },
    ballType: {
        type: String,
        enum: ['Tennis', 'Leather', 'Other'],
        required: true
    },
    overs: {
        type: String,
        enum: ['Limited', 'Test Match'],
        required: true
    },
    tournamentBanner: {
        type: String,
        
    },
    tournamentLogo: {
        type: String,
     
    }
});

const Tournament = mongoose.model('Tournament', tournamentSchema);

module.exports = Tournament;
