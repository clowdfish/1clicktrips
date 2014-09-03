var jwt     = require('jwt-simple');
var User    = require('../app/models/user');

var secret  = '';

module.exports = function(app, passport) {

    secret = app.get('jwtTokenSecret');

    // =============================================================================
    // STANDARD ROUTES =============================================================
    // =============================================================================

    // Check for access token on all API calls
    app.all('/api/*', isLoggedIn);

    // HOME PAGE (with login links) ========
    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

    // PROFILE SECTION (PROTECTED) =========
    app.get('/profile', isLoggedIn, function(req, res) {

        if(req.user) {
            console.log('User in response: ' + req.user.toJSON());

            res.render('profile.ejs', {
                user : req.user // get the user out of session and pass to template
            });
        }
    });

    // LOGOUT ==============================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // =============================================================================
    // AUTHENTICATE (FIRST LOGIN) ==================================================
    // =============================================================================

    // locally --------------------------------

    // show the SIGNUP form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the SIGNUP form
    app.post('/signup', passport.authenticate('local-signup', { session: false }),
        function(req, res) {

            sendAuthenticationToken(req, res, app.get('jwtTokenSecret'));

            /*
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/signup', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages */
        });

    // LOGIN ===============================
    // show the LOGIN form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    // process the LOGIN form
    app.post('/login', passport.authenticate('local-login', { session: false }),
        function(req, res) {

            sendAuthenticationToken(req, res, app.get('jwtTokenSecret'));

            /*
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/login', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages */
        });

    // twitter --------------------------------

    // route for twitter authentication and login
    app.get('/auth/twitter', passport.authenticate('twitter'));

    // handle the callback after twitter has authenticated the user
    app.get('/auth/twitter/callback',
        passport.authenticate('twitter', { session: false }),
            function(req, res) {

                sendAuthenticationToken(req, res, app.get('jwtTokenSecret'));

                /*
                successRedirect : '/profile',
                failureRedirect : '/' */
            });

    // =============================================================================
    // AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
    // =============================================================================

    // locally --------------------------------

    app.get('/connect/local', function(req, res) {
        res.render('connect-local.ejs', { message: req.flash('loginMessage') });
    });

    app.post('/connect/local', passport.authenticate('local-signup', { session: false }),
        function(req, res) {

            sendAuthenticationToken(req, res, app.get('jwtTokenSecret'));

            /*
            successRedirect : '/profile', // redirect to the secure profile section
            failureRedirect : '/connect/local', // redirect back to the signup page if there is an error
            failureFlash : true // allow flash messages */
        });

    // twitter --------------------------------

    // send to twitter to do the authentication
    app.get('/connect/twitter', passport.authorize('twitter', { scope : 'email' }));

    // handle the callback after twitter has authorized the user
    app.get('/connect/twitter/callback',
        passport.authorize('twitter', {
            successRedirect : '/profile',
            failureRedirect : '/'
        }));

    // =============================================================================
    // UNLINK ACCOUNTS =============================================================
    // =============================================================================
    // used to unlink accounts. user account will stay active in case they want to
    // reconnect in the future

    // twitter --------------------------------
    app.get('/unlink/twitter', function(req, res) {
        var user           = req.user;
        user.twitter.token = undefined;

        user.save(function(err) {
            res.redirect('/profile');
        });
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated.  carry on
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token)
                    || req.headers['x-access-token'];

    if (token) {
        try {
            var decoded = jwt.decode(token, secret);

            // handle token here
            if (decoded.exp <= Date.now()) {
                res.end('Access token has expired', 400);
            }

            // attach user to request
            User.findOne({ _id: decoded.iss }, function(err, user) {
                req.user = user;

                return next();
            });
        } catch (err) {
            console.log('Error while decoding token: ' + err.message);
            res.end('Access token could not be validated.', 400);
        }
    }
    else {
        console.log('No token available.');
        // if they aren't redirect them to the home page
        res.redirect('/');
    }
}

// get expiration date based on the current date
function getExpirationDate(daysFromNow) {
    var someDate = new Date();

    if(typeof daysFromNow== "number" && isFinite(daysFromNow) && daysFromNow%1===0) {
        someDate.setDate(someDate.getDate() + daysFromNow);
        return someDate.getTime();
    }
    return null;
}

// create access token with an expiration period of 7 days
function createAuthenticationToken(user, expires, secret) {

    return jwt.encode({
        iss: user._id,
        exp: expires
    }, secret);
}

function sendAuthenticationToken(req, res, secret) {
    if(req.user) {
        console.log("User object available! ID: " + req.user._id);

        var expires = getExpirationDate(7);
        var token = createAuthenticationToken(req.user, expires, secret);
        console.log("Token: " + token);

        res.json({
            token : token,
            expires: expires
        });
    }
    else {
        res.redirect('/');
    }
}