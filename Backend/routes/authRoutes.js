const express = require('express')
const passport = require('passport')

const { siginupController, signInController } = require('../controllers/registerController')
// import { authenticateUser } from "../middlewares/authMiddleware.js";


// //router object
const router = express.Router();
router.get("/", (req, res) => {
  res.render('index')
});

// //routing
// //REGISTER || METHOD POST
router.post("/register", siginupController);
router.post("/login", signInController);

router.get('/auth/google',
  passport.authenticate('google', { scope: ['profile'] }));

router.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect('/');
  });


module.exports = router