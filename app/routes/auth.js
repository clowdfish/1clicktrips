// routes/auth.js

var jwt = require('jwt-simple');

module.exports = function (app, express, passport, production) {

  // ==========================================================================
  // CONTROLLER SETUP =========================================================
  // ==========================================================================
  var AuthController = null;
  var UserController = null;

  if(production) {
    UserController = require('../controller/userController');
    AuthController = require('../controller/authController');
  }
  else {
    UserController = require('../mocking/userController');
    AuthController = require('../mocking/authController');
  }

  // ==========================================================================
  // ROUTER SETUP =============================================================
  // ==========================================================================

  // get an instance of router
  var authApi = express.Router();

  // route all authentication requests to /auth/
  app.use('/auth', authApi);

  // ==========================================================================
  // LOG OUT ==================================================================
  // ==========================================================================

  authApi.get('/logout', function (req, res) {
    req.logout();
    res.status(200).send();
  });

  // ==========================================================================
  // SIGN UP ==================================================================
  // ==========================================================================

  authApi.post('/register', function (req, res, next) {
    passport.authenticate('local-signup', {session: true}, function (err, user, info) {

      if (err)
        res.status(500).json(err);

      if (!user && info) {
        console.log("No user!");
        res.status(401).send(info.message);
      }
      else {
        var token =
          AuthController.getAuthenticationToken(req, res, app.get('jwtTokenSecret'));

        if (!token) {
          console.log("No token!");
          res.status(401).send('status.user.error.authorization.failure');
        }

        UserController
          .getProfile(user.id)
          .then(function (profile) {
            if (profile) {
              profile['token'] = token;
              res.status(200).json(profile);
            }
            else {
              res.status(500);
            }
          })
          .catch(function(err) {
            res.status(500).send(err.message);
          });
      }
    })(req, res, next);
  });

  // ==========================================================================
  // LOG IN ===================================================================
  // ==========================================================================

  authApi.post('/local', passport.authenticate('local-login', {session: true}),
    function (req, res, user) {

      var token =
        AuthController.getAuthenticationToken(req, res, app.get('jwtTokenSecret'));

      if (!token) {
        res.status(401).send('status.user.error.authorization.failure');
      }

      UserController
        .getProfile(req.user.id)
        .then(function (profile) {
          if (profile) {
            profile['token'] = token;
            res.status(200).json(profile);
          }
          else {
            res.status(500);
          }
        })
        .catch(function(err) {
          res.status(500).send(err.message);
        });
    });

  // ==========================================================================
  // PASSWORD RESET ===========================================================
  // ==========================================================================

  authApi.post('/forgot', function(req, res, next) {
    AuthController
      .forgotPassword(req, res, next)
      .then(function() {
        res.sendStatus(200);
      })
      .catch(function(err) {
        res.status(500).send(err.message);
      });
  });

  authApi.post('/reset', function(req, res, next) {
    AuthController
      .resetPassword(req, res)
      .then(function() {
        res.sendStatus(200);
      })
      .catch(function(err) {
        res.status(500).send(err.message);
      })
  });

  authApi.get('/validate-password-reset-token/:reset_password_token', function(req, res, next) {
    AuthController
      .validatePasswordResetToken(req, req.params['reset_password_token'])
      .then(function() {
        res.sendStatus(200);
      })
      .catch(function(err) {
        res.status(401).send(err.message);
      });
  });

  // ==========================================================================
  // TWITTER AUTHENTICATION ===================================================
  // ==========================================================================

  authApi.get('/twitter', passport.authenticate('twitter'));

  // handle the callback after twitter has authenticated the user
  authApi.get('/twitter/callback',
    passport.authenticate('twitter', {session: true}),
    function (req, res) {

      var token =
        AuthController.getAuthenticationToken(req, res, app.get('jwtTokenSecret'));

      var redirectUrl = app.get('loginCallbackUrl') + '?token=' + token;
      res.redirect(redirectUrl);

    });

  // =============================================================================
  // CONNECT SOCIAL ACCOUNTS =====================================================
  // =============================================================================

  authApi.get('/connect/twitter', function (req, res, next) {
    if (req.user)
      console.log(req.user);
    else
      console.log("User not available in request...");

    return next();
  }, passport.authorize('twitter', {scope: 'email'}));

  // handle the callback after twitter has authorized the user
  authApi.get('/connect/twitter/callback',
    passport.authorize('twitter', {
      successRedirect: '/profile',
      failureRedirect: '/'
    }));

  // =============================================================================
  // UNLINK ACCOUNTS =============================================================
  // =============================================================================

  authApi.get('/unlink/twitter', AuthController.isLoggedIn,
    function (req, res) {

      // TODO implement reset of Twitter account
      // set twitter_token to empty string
    });
};
