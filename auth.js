require('dotenv').config()
const passport = require('passport');
const OAuth2Strategy = require('passport-google-oauth2').Strategy;

const ClientID=process.env.CLIENT_ID;
const ClientSecret=process.env.CLIENT_SECRET;

passport.use(new OAuth2Strategy({
    clientID:ClientID,
    clientSecret:ClientSecret,
    callbackURL: "/auth/google/callback",
    passReqToCallback   : true
}, async (request,accessToken, refreshToken, profile, done) => {
    console.log("PROFILE ",profile);
    return done(null,profile)
}));

passport.serializeUser(function(user, done) {
    done(null, user);
});
passport.deserializeUser(function(user, done) {
        done(null, user);
});