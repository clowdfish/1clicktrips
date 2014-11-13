// routes.js

var jwt     = require('jwt-simple');
var User    = require('../app/models/user');
var Search  = require('ttg-search');
var Promise = require('es6-promise').Promise;

var SettingsController = require('./controller/settings');

var ROUTER_PREFIX = "/#/"; // /#/ for the backbone router
var secret = '';

module.exports = function (app, express, passport) {

  secret = app.get('jwtTokenSecret');

  app.get('/logout', function (req, res) {
    req.logout();
    res.status(200).send();
  });

  // =============================================================================
  // API ROUTES ==================================================================
  // =============================================================================

  // get an instance of router
  var settingsApi = express.Router();

  // home page route (http://localhost:8080/)
  settingsApi.get('/', function (req, res) {

    res.status(403).send('not accessible');
  });

  // get available languages (http://localhost:8080/lang/)
  settingsApi.get('/lang', function (req, res) {

    res.status(200).json(
      [
        {
          'lang': 'de',
          'iso': 'de-DE',
          'name': 'Deutsch'
        },
        {
          'lang': 'en',
          'iso': 'en-US',
          'name': 'English'
        }
      ]
    );
  });

  // profile page route (http://localhost:8080/profile/)
  settingsApi.get('/profile/details', function (req, res) {
    var userId = getUserIdFromToken(req);

    SettingsController.getSettings(userId, function (callback_settings) {
      if (callback_settings)
        res.status(200).json(callback_settings.profile);
      else
        res.status(500);
    });
  });
  settingsApi.post('/profile/details', function (req, res) {
    if (req.body) {
      var userId = getUserIdFromToken(req);

      SettingsController.createSettings(userId, {'profile': req.body}, function (err, success) {
        if (err) {
          console.error('There was a problem updating the settings.');
          res.status(500).send();
        }

        res.status(200).send(success);
      });
    }
    else {
      res.status(400).send();
    }
  });

  settingsApi.get('/profile/preferences', function (req, res) {
    var userId = getUserIdFromToken(req);

    SettingsController.getSettings(userId, function (callback_settings) {
      if (callback_settings)
        res.status(200).json(callback_settings.preferences);
      else
        res.status(500);
    });
  });
  settingsApi.post('/profile/preferences', function (req, res) {
    if (req.body) {
      var userId = getUserIdFromToken(req);

      SettingsController.createSettings(userId, {'preferences': req.body}, function (err, success) {
        if (err) {
          console.error('There was a problem updating the settings.');
          res.status(500).send();
        }

        res.status(200).send(success);
      });
    }
    else {
      res.status(400).send();
    }
  });

  settingsApi.get('/profile/privacy', function (req, res) {
    var userId = getUserIdFromToken(req);

    SettingsController.getSettings(userId, function (callback_settings) {
      if (callback_settings)
        res.status(200).json(callback_settings.privacy);
      else
        res.status(500);
    });
  });
  settingsApi.post('/profile/privacy', function (req, res) {
    if (req.body) {
      var userId = getUserIdFromToken(req);

      SettingsController.createSettings(userId, {'privacy': req.body}, function (err, success) {
        if (err) {
          console.error('There was a problem updating the settings.');
          res.status(500).send();
        }

        res.status(200).send(success);
      });
    }
    else {
      res.send(400).send();
    }
  });

  // Check for access token on particular API calls
  app.all('/profile/*', isLoggedIn);
  app.use('/', settingsApi);

  // ==========================================================================
  // SEARCH API ===============================================================
  // ==========================================================================

  // get an instance of router
  var searchApi = express.Router();

  // home page route (http://localhost:8080/search/)
  searchApi.post('/', function (req, res) {

    console.log('Request coming from the client:');
    console.log(JSON.stringify(req.body, null, 2));

    if(checkValidityOfRequest(req)) {

      var searchObject = null;
      var userLicence = null;

      new Promise(function (resolve, reject) {

        console.log("Extracting user:");

        getUserFromRequest(req, function (user) {
          resolve(user);
        });
      })
        .then(function (user) {
          console.log(user);

          userLicence = user.licence;

          return new Promise(function (resolve) {

            searchObject = req.body;

            if (!req.body['preferences'] &&
              (user.local || user.twitter || user.google)) {

              console.log("Looking up preferences for user...");

              var userId = getUserIdFromToken(req);

              SettingsController.getSettings(userId, function (callback_settings) {
                if (callback_settings)
                  searchObject.preferences = callback_settings;

                resolve();
              });
            }
            else {
              console.log("No preferences available for user!");

              resolve();
            }
          });
        })
        .then(function () {

          console.log("Start search with object: ");
          console.log(searchObject);
          console.log("User Licence: " + userLicence);

          // use TTG Search API to get results
          return Search.getTrips(searchObject, userLicence);
        })
        .then(function (results) {

          console.log("Success.");
          res.status(200).json(results);
        })
        .catch(function (error) {
          console.error(error);
          res.status(500).json(error);
        });
    }
    else {
      res.status(400).send('status.user.error.request.malformed');
    }
  });

  app.use('/search/', searchApi);

  // ==========================================================================
  // AUTHENTICATE (FIRST LOGIN) ===============================================
  // ==========================================================================

  // locally --------------------------------

  // show the SIGNUP form
  app.get('/signup', function (req, res) {
    res.redirect(ROUTER_PREFIX + 'signup');
  });

  // process the SIGNUP form
  app.post('/signup', function (req, res, next) {
    passport.authenticate('local-signup', {session: true}, function (err, user, info) {

      if (err)
        res.status(500).json(err);
      if (!user && info)
        res.status(401).send(info.message);
      else
        sendAuthenticationToken(req, res, app.get('jwtTokenSecret'));
    })(req, res, next);
  });

  // LOGIN ===============================
  // show the LOGIN form
  app.get('/login', function (req, res, next) {
    //res.redirect(ROUTER_PREFIX + 'signin');
    console.log("Login triggered.");
  });

  // process the LOGIN form
  app.post('/login', passport.authenticate('local-login', {session: true}),
    function (req, res) {

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
    passport.authenticate('twitter', {session: true}),
    function (req, res) {
      res.redirect(ROUTER_PREFIX + 'signup?confirm='
      + getAuthenticationToken(req, res, app.get('jwtTokenSecret')));
    });

  // =============================================================================
  // AUTHORIZE (ALREADY LOGGED IN / CONNECTING OTHER SOCIAL ACCOUNT) =============
  // =============================================================================

  // locally --------------------------------
  // TODO Just create a form that with email + password that POSTs to '/connect/local'
  app.post('/connect/local', passport.authenticate('local-signup', {session: true}),
    function (req, res) {
      res.redirect(ROUTER_PREFIX + 'profile');
    });

  // twitter --------------------------------

  // send to twitter to do the authentication
  app.get('/connect/twitter', function (req, res, next) {
    if (req.user)
      console.log(req.user);
    else
      console.log("User not available in request...");

    return next();
  }, passport.authorize('twitter', {scope: 'email'}));

  // handle the callback after twitter has authorized the user
  app.get('/connect/twitter/callback',
    passport.authorize('twitter', {
      successRedirect: ROUTER_PREFIX + 'profile',
      failureRedirect: ROUTER_PREFIX + '/'
    }));

  // =============================================================================
  // UNLINK ACCOUNTS =============================================================
  // =============================================================================
  // used to unlink accounts. user account will stay active in case they want to
  // reconnect in the future

  // twitter --------------------------------
  app.get('/unlink/twitter', isLoggedIn, function (req, res) {
    var user = req.user;
    user.twitter.token = undefined;
    user.twitter.username = undefined;

    user.save(function () {
      SettingsController.createSettings(user._id, {'profile': {'twitter': ''}}, function (err, settings) {
        if (err)
          res.status(500).json(err);
        else
          res.status(200).json(settings);
      });
    });
  });

  // =============================================================================
  // FALLBACK =============================================================
  // =============================================================================

  // all other requests should be answered with 404
  app.use('*', function (req, res) {
    res.status(404).send('status.user.error.server.failure');
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
        res.status(401).send('status.user.error.token.expired');
      }
      else {
        // attach user to request
        User.findOne({_id: decoded.iss}, function (err, user) {
          req.user = user;
          return next();
        });
      }
    } catch (err) {
      console.error('Error while decoding token: ' + err.message);
      res.status(401).send('status.user.error.token.invalid');
    }
  }
  else {
    console.warn('No token available.');
    // if they aren't redirect them to the home page
    res.status(401).send('status.user.error.authorization.failure');
  }
}

// route middleware to make sure a user is logged in
function getUserFromRequest(req, callback) {

  // if user is authenticated.  carry on
  var token = (req.body && req.body.access_token) || (req.query && req.query.access_token)
    || req.headers['x-access-token'];

  if (token) {
    try {
      var decoded = jwt.decode(token, secret);

      // handle token here
      if (decoded.exp > Date.now()) {
        // attach user to request
        User.findOne({_id: decoded.iss}, function (err, user) {
          if(!err) {
            if(!user.licence)
              user.licence = 0;

            callback(user);
          }
          else
            console.warn('No user found for the current session.');
        });
      }
    }
    catch (err) {
      console.log('Error while decoding token: ' + err.message);
    }
  }

  callback({
    licence: 0
  });
}

// get expiration date based on the current date
function getExpirationDate(daysFromNow) {
  var someDate = new Date();

  if (typeof daysFromNow == "number" && isFinite(daysFromNow) && daysFromNow % 1 === 0) {
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
  if (req.user) {
    //console.log("User object available! ID: " + req.user._id);

    var expires = getExpirationDate(7);
    return createAuthenticationToken(req.user, expires, secret);
  }
  else {
    return "error";
  }
}

function sendAuthenticationToken(req, res, secret) {
  if (req.user) {
    var expires = getExpirationDate(7);
    var token = createAuthenticationToken(req.user, expires, secret);

    res.json({
      token: token,
      expires: expires
    });
  }
  else {
    res.status(401).send('status.user.error.authorization.failure');
  }
}

function checkValidityOfRequest(req) {

  function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  if(req.body['origin'] && req.body['appointments'] &&
    req.body['appointments'].length>0 && req.body['settings'] && (
    req.body['oneWay'] === true || req.body['oneWay'] === false)) {

    if(!isNumber(req.body['origin']['latitude'])
      || !isNumber(req.body['origin']['longitude']))
      return false;

    req.body['appointments'].forEach(function(appointment) {
      if(!(appointment['location']
        && isNumber(appointment['location']['latitude'])
        && isNumber(appointment['location']['longitude'])))
        return false;

      var timePattern =
        /^[0-9]{4}\-[0-9]{2}\-[0-9]{2}T[0-9]{2}:[0-9]{2}:[0-9]{2}$/;

      if(!(timePattern.test(appointment['start']) &&
          timePattern.test(appointment['end'])))
        return false;
    });
  }
  else
    return false;

  return true;
}
