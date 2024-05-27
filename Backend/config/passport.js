var GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports = (passport) => {


  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "hhttp://localhost:3001/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log("trying to access user")
    // User.findOrCreate({ googleId: profile.id }, function (err, user) {
    //   return done(err, user);
    // });
  }
));

}