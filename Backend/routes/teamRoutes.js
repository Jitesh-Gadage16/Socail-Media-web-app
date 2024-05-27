const express = require('express')
const passport = require('passport')

const  { isAdmin, requireSignIn,authenticateUser } = require('../middlewares/authMiddlewares')
const uploader = require("../multer");
const {addTeam,editTeam,deleteTeam} = require('../controllers/teamController')
// //router object
const router = express.Router();

    

router.post("/addteam",requireSignIn, addTeam);
router.put('/team/:id', requireSignIn,editTeam);
router.delete('/team/:id',requireSignIn, deleteTeam);
// router.get("/getUserTeams",requireSignIn, getUserTournaments);

module.exports = router 