// load all the things we need
var LocalStrategy   = require('passport-local').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;

// load up the user model
var User        = require('../app/models/user');

// load up the settings controller
var SettingsController = require('../app/controller/settings');

// load the auth variables
var configAuth  = require('./auth');

// expose this function to our app using module.exports
module.exports = function(passport) {

    // =========================================================================
    // passport session setup ==================================================
    // =========================================================================
    // required for persistent login sessions
    // passport needs ability to serialize and unserialize users out of session

    // used to serialize the user for the session
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    // used to deserialize the user
    passport.deserializeUser(function(id, done) {
        User.findById(id, function(err, user) {
            done(err, user);
        });
    });

    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-signup', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
        },
        function(req, email, password, done) {

            // asynchronous
            process.nextTick(function() {

                //  Whether we're signing up or connecting an account, we'll need
                //  to know if the email address is in use.
                User.findOne({'local.email': email}, function(err, existingUser) {

                    // if there are any errors, return the error
                    if (err) {
                        console.log('Error!');
                        return done(err);
                    }

                    // check to see if there's already a user with that email
                    if (existingUser) {
                        return done(null, false, { message: 'status.user.error.signup.exists' });
                    }

                    //  If we're logged in, we're connecting a new local account.
                    if(req.user) {
                        console.log('User!');
                        var user            = req.user;

                        user.local.email    = email;
                        user.local.password = user.generateHash(password);

                        user.save(function(err) {
                            if (err)
                                throw err;

                            SettingsController.createSettings(user._id, { 'profile' : { 'email': email } }, function() {
                                console.log('User and settings have been updated!');

                                // attach user to request
                                req.user = user;
                                return done(null, user);
                            });
                        });
                    }
                    //  We don't have a user yet, so we're creating a brand new user.
                    else {
                        // create the user
                        var newUser            = new User();

                        newUser.local.email    = email;
                        newUser.local.password = newUser.generateHash(password);

                        newUser.save(function(err) {
                            if (err)
                                throw err;

                            SettingsController.createSettings(newUser._id, { 'profile' : { 'email': email } }, function() {
                                console.log('New user and settings have been created!');

                                // attach user to request
                                req.user = newUser;
                                return done(null, newUser);
                            });
                        });
                    }

                });
            });
        }));

    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    // we are using named strategies since we have one for login and one for signup
    // by default, if there was no name, it would just be called 'local'

    passport.use('local-login', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, email, password, done) { // callback with email and password from our form

            // find a user whose email is the same as the forms email
            // we are checking to see if the user trying to login already exists
            User.findOne({ 'local.email' :  email }, function(err, user) {
                // if there are any errors, return the error before anything else
                if (err)
                    return done(err);

                // if no user is found, return the message
                if (!user)
                    return done(null, false, { message: 'status.user.error.signin.username' });

                // if the user is found but the password is wrong
                if (!user.validPassword(password))
                    return done(null, false, { message: 'status.user.error.signin.password' });

                // all is well, return successful user
                req.user = user;
                return done(null, user);
            });

        }));

    // =========================================================================
    // TWITTER =================================================================
    // =========================================================================
    passport.use(new TwitterStrategy({

            consumerKey         : configAuth.twitterAuth.consumerKey,
            consumerSecret      : configAuth.twitterAuth.consumerSecret,
            callbackURL         : configAuth.twitterAuth.callbackURL,
            passReqToCallback   : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
        },
        function(req, token, tokenSecret, profile, done) {
            // make the code asynchronous
            // User.findOne won't fire until we have all our data back from Twitter
            process.nextTick(function() {
                // check if the user is already logged in
                if (!req.user) {
                    User.findOne({ 'twitter.id': profile.id }, function (err, user) {

                        // if there is an error, stop everything and return that
                        // ie an error connecting to the database
                        if (err)
                            return done(err);

                        // if the user is found then log them in
                        if (user) {
                            // if there is a user id already but no token (user was linked at one point and then removed)
                            // just add our token and profile information
                            if (!user.twitter.token) {
                                user.twitter.token = token;
                                user.twitter.username = profile.username;
                                user.twitter.displayName = profile.displayName;

                                user.save(function (err) {
                                    if (err)
                                        throw err;

                                    SettingsController.createSettings(user._id, { 'profile' : { 'twitter': profile.username } }, function() {
                                        console.log('User and settings have been updated!');

                                        // attach user to request
                                        req.user = user;
                                        return done(null, user);
                                    });
                                });
                            }

                            req.user = user;
                            return done(null, user); // user found, return that user
                        } else {
                            // if there is no user, create them
                            var newUser = new User();

                            // set all of the user data that we need
                            newUser.twitter.id = profile.id;
                            newUser.twitter.token = token;
                            newUser.twitter.username = profile.username;
                            newUser.twitter.displayName = profile.displayName;

                            // save our user into the database
                            newUser.save(function (err) {
                                if (err)
                                    throw err;

                                SettingsController.createSettings(newUser._id, { 'profile' : { 'twitter': profile.username } }, function() {
                                    console.log('User and settings have been updated!');

                                    // attach user to request
                                    req.user = newUser;
                                    return done(null, newUser);
                                });
                            });
                        }
                    });
                }
                else {
                    // user already exists and is logged in, we have to link accounts
                    var user = req.user; // pull the user out of the session

                    // update the current users twitter credentials
                    user.twitter.id             = profile.id;
                    user.twitter.token          = token;
                    user.twitter.username       = profile.username;
                    user.twitter.displayName    = profile.displayName;

                    console.log("Twitter Account has been linked with user.");

                    // save the user
                    user.save(function(err) {
                        if (err)
                            throw err;

                        SettingsController.createSettings(user._id, { 'profile' : { 'twitter': profile.username } }, function() {
                            console.log('User and settings have been updated!');

                            // attach user to request
                            req.user = user;
                            return done(null, user);
                        });
                    });
                }
            });
        }));
};
