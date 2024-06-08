const express = require('express')
const passport = require('passport')
const multer = require('multer')
// const upload = multer({ dest: '  uploads/' })

const { editProfile, followUser, unfollowUser, createProfile, getUserProfile } = require('../controllers/profileController')
const { isAdmin, requireSignIn, authenticateUser } = require('../middlewares/authMiddlewares')
// import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const upload = require('../middlewares/multerMiddlewares.js')


const { addTournament, editTournament, getUserTournaments, deleteTournament } = require('../controllers/tournamentController')

// //router object
const router = express.Router();


// //routing
// //REGISTER || METHOD POST
router.post("/profile", upload.single('file'), createProfile);
// router.post("/addprofile", upload.single('file'), addProfile);
router.put("/profile", upload.single('file'), editProfile);
// Route to get user profile
router.get('/get-profile', getUserProfile);
router.post('/follow/:userIdToFollow', requireSignIn, followUser);
router.post('/unfollow/:userIdToUnfollow', requireSignIn, unfollowUser);

router.post("/addtournament", requireSignIn, addTournament);
router.put('/tournaments/:id', requireSignIn, editTournament);
router.delete('/tournaments/:id', requireSignIn, deleteTournament);
router.get("/getUserTournaments", requireSignIn, getUserTournaments);

module.exports = router 