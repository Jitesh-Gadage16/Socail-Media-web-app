const { CloudFormation } = require('aws-sdk');
const Tournament = require('../models/tournamentModel');
const profileModel = require('../models/userModel')

// Add Tournament
exports.addTournament = async (req, res) => {

    
    try {
        const userId = req.user._id; // Assuming you have user authentication middleware
        console.log(userId);

        const getProfile = await profileModel.findOne({ _id: userId });
        console.log("=>",getProfile);
        if (!getProfile) {
            return res.status(404).json({ message: "User not Logged in" });
        }
        // Modify the fetched data to include only username and userId
        const responseData = {
            username: getProfile.name,
            userId: getProfile._id // Assuming userId is stored in _id field
        };

        const {
            tournamentName,
            location,
            groundName,
            organiserPhoneNumber,
            startDate,
            endDate,
            matchType,
            ballType,
            overs,
            tournamentBanner,
            tournamentLogo
        } = req.body;

      

        const tournament = new Tournament({
            tournamentName,
            location,
            groundName,
            organiserName:responseData,   
            organiserPhoneNumber,
            startDate,
            endDate,
            matchType,
            ballType,
            overs,
            tournamentBanner,
            tournamentLogo
        });

        console.log("tournament", tournament);

        await tournament.save();


        res.status(201).json({ message: 'Tournament added successfully', tournament });
    } catch (error) {
        console.error('Error adding tournament:', error);
        res.status(500).json({ message: 'An error occurred while adding the tournament' });
    }
};

// Edit Tournament
exports.editTournament = async (req, res) => {
    try {
        const userId = req.user._id; // Assuming you have user authentication middleware

        const tournamentId = req.params.id; // Assuming the tournament ID is passed in the request params

        const tournament = await Tournament.findById(tournamentId);


        console.log("===>",userId,tournamentId);
        

        if (!tournament) {
            return res.status(404).json({ message: "Tournament not found" });
        }

        // Check if the user editing the tournament is the organiser
        if (String(tournament.organiserName.userId) !== String(userId)) {
            return res.status(403).json({ message: "You are not authorized to edit this tournament" });
        }

        // Update the tournament data
        tournament.tournamentName = req.body.tournamentName;
        tournament.location = req.body.location;
        tournament.groundName = req.body.groundName;
        tournament.organiserPhoneNumber = req.body.organiserPhoneNumber;
        tournament.startDate = req.body.startDate;
        tournament.endDate = req.body.endDate;
        tournament.matchType = req.body.matchType;
        tournament.ballType = req.body.ballType;
        tournament.overs = req.body.overs;
        tournament.tournamentBanner = req.body.tournamentBanner;
        tournament.tournamentLogo = req.body.tournamentLogo;

        await tournament.save();

        res.status(200).json({ message: 'Tournament updated successfully', tournament });
    } catch (error) {
        console.error('Error editing tournament:', error);
        res.status(500).json({ message: 'An error occurred while editing the tournament' });
    }
};

// Delete Tournament
exports.deleteTournament = async (req, res) => {
    try {
        const userId = req.user._id; // Assuming you have user authentication middleware

        const tournamentId = req.params.id; // Assuming the tournament ID is passed in the request params

        const tournament = await Tournament.findById(tournamentId);

        if (!tournament) {
            return res.status(404).json({ message: "Tournament not found" });
        }

        // Check if the user deleting the tournament is the organiser
        if (String(tournament.organiserName.userId) !== String(userId)) {
            return res.status(403).json({ message: "You are not authorized to delete this tournament" });
        }

    
        await Tournament.deleteOne({ _id: tournamentId });

        res.status(200).json({ message: 'Tournament deleted successfully' });
    } catch (error) {
        console.error('Error deleting tournament:', error);
        res.status(500).json({ message: 'An error occurred while deleting the tournament' });
    }
};


//get user tournaments
exports.getUserTournaments = async(req, res) => {

    try {
        const userId = req.user._id; // Assuming you have user authentication middleware
        console.log(userId);

        const getProfile = await profileModel.findOne({ _id: userId });
        console.log("=>",getProfile);
        if (!getProfile) {
            return res.status(404).json({ message: "User not Logged in" });
        }

        const getUserTournamentstour = await Tournament.find({
            "organiserName.userId": getProfile._id 
          })

          console.log("getUserTournamentstour",getUserTournamentstour)
        

        res.status(201).json({ message: 'Records Found', getUserTournamentstour });
    } catch (error) {
        console.error('Error getting user tournament:', error);
        res.status(500).json({ message: 'An error occurred while getting the tournament' });
    }

}
