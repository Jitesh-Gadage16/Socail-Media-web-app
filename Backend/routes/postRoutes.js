const express = require('express')
const { createPost, likePost, getFollowedUsersPosts, getAllUserPost, addComment } = require('../controllers/postController.js')
const { createStory, viewStory } = require('../controllers/storyController.js')
const { isAdmin, requireSignIn, authenticateUser } = require('../middlewares/authMiddlewares')
const upload = require('../middlewares/multerMiddlewares.js')




const router = express.Router();


router.post("/createPost", requireSignIn, upload.single('file'), createPost);

router.post("/post/:id", requireSignIn, likePost);
router.get("/followed-users-posts", requireSignIn, getFollowedUsersPosts);
router.get("/all-posts", getAllUserPost);

// Add a comment to a post
router.post('/comments/:postId', requireSignIn, addComment);


//add story 
router.post("/addstory", requireSignIn, upload.single('file'), createStory);
router.post('/stories/:storyId', viewStory);


module.exports = router

