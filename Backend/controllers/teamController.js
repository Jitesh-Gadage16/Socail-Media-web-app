const Team = require('../models/teamModel');

// Controller method to add a new team
const addTeam = async (req, res) => {
    try {

        const userId = req.user._id; // Assuming you have user authentication middleware
        console.log("userId",userId);

        if(!userId){
            return res.status(404).json({ message: "User not Logged in.." });
        }
        // Extract team data from request body
        const { team_name, team_shortname, team_flag, team_city, team_logo } = req.body;

        // Create a new team instance
        const newTeam = new Team({
            team_name,
            team_shortname,
            organizer_id:userId,
            team_city,
            team_logo
        });

        // Save the new team to the database
        const savedTeam = await newTeam.save();

        console.log("add team",newTeam);

        res.status(201).json({ message: 'Team added successfully', savedTeam });
    } catch (error) {
        console.error('Error adding team:', error);
        res.status(500).json({ error: 'Failed to add team' });
    }
};

// Controller method to edit an existing team
const editTeam = async (req, res) => {
    try {
        const userId = req.user._id; // Assuming you have user authentication middleware

        if (!userId) {
            return res.status(404).json({ message: "User not Logged in.." });
        }

        const { id } = req.params; // Get team ID from request params
        const { team_name, team_shortname, team_flag, team_city, team_logo } = req.body;

        // Find the team by ID and check if the user is the organizer of the team
        const existingTeam = await Team.findById(id);
        if (!existingTeam) {
            return res.status(404).json({ message: "Team not found" });
        }
        if (existingTeam.organizer_id.toString() !== userId.toString()) {
            return res.status(403).json({ message: "You are not authorized to edit this team" });
        }

        // Update the team data
        existingTeam.team_name = team_name;
        existingTeam.team_shortname = team_shortname;
        existingTeam.team_flag = team_flag;
        existingTeam.team_city = team_city;
        existingTeam.team_logo = team_logo;

        // Save the updated team to the database
        const updatedTeam = await existingTeam.save();

        res.json({ message: 'Team updated successfully', updatedTeam });
    } catch (error) {
        console.error('Error editing team:', error);
        res.status(500).json({ error: 'Failed to edit team' });
    }
};

// Controller method to delete an existing team
const deleteTeam = async (req, res) => {
    try {
        const { id } = req.params; // Get team ID from request params

        // Find the team by ID and delete it
        await Team.findByIdAndDelete(id);

        res.json({ message: 'Team deleted successfully' });
    } catch (error) {
        console.error('Error deleting team:', error);
        res.status(500).json({ error: 'Failed to delete team' });
    }
};

module.exports = { addTeam, editTeam, deleteTeam };
