// routes/auth.js

var jwt = require('jwt-simple');

module.exports = function (app, express, passport, production) {

  // ==========================================================================
  // CONTROLLER SETUP =========================================================
  // ==========================================================================
  var AuthController = require('../controller/auth');
  var UserController = null;

  if(production) {
    UserController = require('./../controller/user');
    AuthController.setProduction();
  }
  else {
    UserController = require('./../mocking/user');
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

      if (!user && info)
        res.status(401).send(info.message);
      else {
        var token =
          AuthController.getAuthenticationToken(req, res, app.get('jwtTokenSecret'));

        if(token)
          res.status(200).json({ token: token });
        else
          res.status(401).send('status.user.error.authorization.failure');
      }
    })(req, res, next);
  });

  // ==========================================================================
  // LOG IN ===================================================================
  // ==========================================================================

  authApi.post('/local', passport.authenticate('local-login', {session: true}),
    function (req, res) {

      var token =
        AuthController.getAuthenticationToken(req, res, app.get('jwtTokenSecret'));

      if(token)
        res.status(200).json({ token: token });
      else
        res.status(401).send('status.user.error.authorization.failure');
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

      if(token)
        res.status(200).json({ token: token });
      else
        res.status(401).send('status.user.error.authorization.failure');
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

  authApi.get('/unlink/twitter',
    AuthController.isLoggedIn,
    function (req, res) {

    UserController.set(req.user.id, 'twitter_token', '')
      .then(function() {
          res.status(200).send();
      })
      .catch(function(err) {
          res.status(500).json(err);
      });
  });
};