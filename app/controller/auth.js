// controller/auth.js

var Promise = require('es6-promise').Promise;
var jwt = require('jwt-simple');
var configAuth = require('../../config/auth');

var UserController = require('./user');

module.exports = {

  production: false,

  setProduction: function() {
    this.production = true;
  },

  isLoggedIn: function(req, res, next) {

    if(!this.production) {
      req.user = {
        id: 42,
        licence: 1
      };

      return next();
    }

    var token = req.headers['x-access-token'];

    if (token) {
      try {
        var decoded = jwt.decode(token, configAuth.secret);

        // handle token here
        if (decoded.exp <= Date.now()) {
          res.status(401).send('status.user.error.token.expired');
        }
        else {
          // attach user to request
          UserController.getById(decoded.iss)
            .then(function (err, user) {
              req.user = user;
              return next();
            })
            .catch(function(err) {
              throw err;
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
  },

  getUserIdFromRequest: function(req, secret) {

    var production = this.production;
    var token = req.headers['x-access-token'];

    if (token && production) {
      try {
        var decoded = jwt.decode(token, secret);

        // handle token here
        if (decoded.exp > Date.now()) {
          return decoded.iss;
        }
      }
      catch (err) {
        console.error('Error while decoding token: ' + err.message);
      }
    }

    return production ? -1 : 42;
  },

  getExpirationDate: function(daysFromNow) {
    var someDate = new Date();

    if (typeof daysFromNow == "number" && isFinite(daysFromNow) && daysFromNow % 1 === 0) {
      someDate.setDate(someDate.getDate() + daysFromNow);
      return someDate.getTime();
    }
    else
      throw new Error('Wrong argument format.');
  },

  getAuthenticationToken: function(req, res, secret) {
    if (req.user) {
      var expires = this.getExpirationDate(7);
      return jwt.encode({ iss: user.id, exp: expires }, secret);
    }
    return null;
  }
};