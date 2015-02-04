// controller/auth.js

var Promise = require('es6-promise').Promise;
var jwt = require('jwt-simple');
var configAuth = require('../../config/auth');

module.exports = {

  isLoggedIn: function(req, res, next) {

    // if user is authenticated.  carry on
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token)
      || req.headers['x-access-token'];

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

  getUserFromRequest: function(req, secret) {

    // if user is authenticated.  carry on
    var token = (req.body && req.body.access_token) || (req.query && req.query.access_token)
      || req.headers['x-access-token'];

    return new Promise(function(resolve, reject) {

      if (token) {
        try {
          var decoded = jwt.decode(token, secret);

          // handle token here
          if (decoded.exp > Date.now()) {
            UserController.getById(decoded.iss)
              .then(function (user) {
                if(!user.licence)
                  user.licence = 0;

                resolve(user);
              });
          }
        }
        catch (err) {
          console.error('Error while decoding token: ' + err.message);
        }
      }

      resolve({
        licence: 0
      });
    });
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