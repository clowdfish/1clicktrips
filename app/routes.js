var jwt     = require('jwt-simple');
var User    = require('../app/models/user');
var SettingsController = require('./controller/settings');

var ROUTER_PREFIX = "/#/"; // /#/ for the backbone router
var secret  = '';

module.exports = function(app, express, passport) {

    secret = app.get('jwtTokenSecret');

    app.get('/logout', function(req, res) {
        req.logout();
        res.status(200).send();
    });

    // =============================================================================
    // API ROUTES ==================================================================
    // =============================================================================

    // get an instance of router
    var apiRouter = express.Router();

    // home page route (http://localhost:8080/api/)
    apiRouter.get('/', function(req, res) {

        res.send('not accessible');
    });

    // get available languages (http://localhost:8080/api/lang/)
    apiRouter.get('/lang', function(req, res) {

        res.status(200).json(
            [
                {
                    'iso': 'de-DE',
                    'name': 'Deutsch'
                },
                {
                    'iso' : 'en-US',
                    'name' : 'English'
                }
            ]
        );
    });

    // profile page route (http://localhost:8080/api/profile/)
    apiRouter.get('/profile/details', function(req, res) {
        var userId = getUserIdFromToken(req);

        SettingsController.getSettings(userId, function(callback_settings) {
            if(callback_settings)
                res.status(200).json(callback_settings.profile);
            else
                res.status(500);
        });
    });
    apiRouter.post('/profile/details', function(req, res) {
        if(req.body) {
            var userId = getUserIdFromToken(req);

            SettingsController.createSettings(userId, { 'profile': req.body }, function (err, success) {
                if (err) {
                    console.error('There was a problem updating the settings.');
                    res.send(500).send();
                }

                res.status(200).send(success)
            });
        }
        else {
            res.send(422).send();
        }
    });

    apiRouter.get('/profile/preferences', function(req, res) {
        var userId = getUserIdFromToken(req);

        SettingsController.getSettings(userId, function(callback_settings) {
            if(callback_settings)
                res.status(200).json(callback_settings.preferences);
            else
                res.status(500);
        });
    });
    apiRouter.post('/profile/preferences', function(req, res) {
        if(req.body) {
            var userId = getUserIdFromToken(req);

            SettingsController.createSettings(userId, { 'preferences': req.body }, function (err, success) {
                if (err) {
                    console.error('There was a problem updating the settings.');
                    res.send(500).send();
                }

                res.status(200).send(success);
            });
        }
        else {
            res.send(422).send();
        }
    });

    apiRouter.get('/profile/privacy', function(req, res) {
        var userId = getUserIdFromToken(req);

        SettingsController.getSettings(userId, function(callback_settings) {
            if(callback_settings)
                res.status(200).json(callback_settings.privacy);
            else
                res.status(500);
        });
    });
    apiRouter.post('/profile/privacy', function(req, res) {
        if(req.body) {
            var userId = getUserIdFromToken(req);

            SettingsController.createSettings(userId, { 'privacy': req.body }, function (err, success) {
                if (err) {
                    console.error('There was a problem updating the settings.');
                    res.send(500).send();
                }

                res.status(200).send(success);
            });
        }
        else {
            res.send(422).send();
        }
    });

    // Check for access token on particular API calls
    app.all('/api/profile/*', isLoggedIn);
    app.use('/api/', apiRouter);

    // =============================================================================
    // AUTHENTICATE (FIRST LOGIN) ==================================================
    // =============================================================================

    // locally --------------------------------

    // show the SIGNUP form
    app.get('/signup', function(req, res) {
        res.redirect(ROUTER_PREFIX + 'signup');
    });

    // process the SIGNUP form
    app.post('/signup', function(req, res, next) {
        passport.authenticate('local-signup', { session: false }, function(err, user, info) {

            if(err)
                res.status(500).json(err);
            if(!user && info)
                res.status(401).send(info.message);
            else
                sendAuthenticationToken(req, res, app.get('jwtTokenSecret'));
        })(req, res, next);
    });

    // LOGIN ===============================
    // show the LOGIN form
    app.get('/login', function (req, res, next) {
        res.redirect(ROUTER_PREFIX + 'signup?signin=1');
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
                res.redirect(ROUTER_PREFIX + 'signup?confirm='
                    + getAuthenticationToken(req, res, app.get('jwtTokenSecret')));
            });

    // =============================================================================
    // AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
    // =============================================================================

    // locally --------------------------------
    // TODO Just create a form that with email + password that POSTs to '/connect/local'
    app.post('/connect/local', passport.authenticate('local-signup', { session: false }),
        function(req, res) {
            res.redirect(ROUTER_PREFIX + 'profile');
        });

    // twitter --------------------------------

    // send to twitter to do the authentication
    app.get('/connect/twitter', passport.authorize('twitter', { scope : 'email' }));

    // handle the callback after twitter has authorized the user
    app.get('/connect/twitter/callback',
        passport.authorize('twitter', {
            successRedirect : ROUTER_PREFIX + 'profile',
            failureRedirect : ROUTER_PREFIX + '/'
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

        user.save(function() {
            res.redirect(ROUTER_PREFIX + '/profile');
        });
    });

    // =============================================================================
    // FALLBACK =============================================================
    // =============================================================================

    // all other requests should be answered with 401
    app.use('*', function(req, res) {
        res.status(401).send('status.user.error.authorization.failure');
    });
};

function getUserIdFromToken(req) {
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token)
        || req.headers['x-access-token'];

    if (token) {
        try {
            var decoded = jwt.decode(token, secret);

            // handle token here
            if (decoded.exp <= Date.now()) {
                return null;
            }
            return decoded.iss;
        } catch (err) {
            console.log('Error while decoding token: ' + err.message);
            return null;
        }
    }
    else {
        return null;
    }
}

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
                res.end('status.user.error.token.expired', 400);
            }
						else {
		          // attach user to request
		          User.findOne({ _id: decoded.iss }, function(err, user) {
		              req.user = user;

		              return next();
		          });
						}
        } catch (err) {
            console.log('Error while decoding token: ' + err.message);
            res.end('status.user.error.token.invalid', 400);
        }
    }
    else {
        console.log('No token available.');
        // if they aren't redirect them to the home page
        res.status(401).send('status.user.error.authorization.failure');
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

function getAuthenticationToken(req, res, secret) {
    if(req.user) {
        //console.log("User object available! ID: " + req.user._id);

        var expires = getExpirationDate(7);
        return createAuthenticationToken(req.user, expires, secret);
    }
    else {
       return "error";
    }
}

function sendAuthenticationToken(req, res, secret) {
    if(req.user) {
        var expires = getExpirationDate(7);
        var token = createAuthenticationToken(req.user, expires, secret);

        res.json({
            token : token,
            expires: expires
        });
    }
    else {
        res.status(401).send('status.user.error.authorization.failure');
    }
}
