// controller/authController.js

var jwt = require('jwt-simple');
var bcrypt = require('bcrypt');
var crypto = require('crypto');
var configAuth = require('../../config/auth');

var dbConfig = require('../../config/database.js');
var mysql = require('mysql');
var connection = mysql.createConnection(dbConfig.connection);

var general = require('../../config/general');
var authConfig = require('../../config/auth');

var async = require('async');
var Promise = require('es6-promise').Promise;

var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var sendGridTransport = require('nodemailer-sendgrid-transport');

var UserController = require('./userController');

var moment = require('moment');
module.exports = {

  forgotPassword: function(req, res, next) {
    return new Promise(function(resolve, reject) {
      async.waterfall([
        function(done) {
          connection.query('SELECT * FROM user where email = ?', [req.body.email], function(err, users) {
            if (err) {
              return done(err);
            }
            if (!users || users.length == 0) {
              return done(new Error('error.email.address.not.exists'));
            }
            done(null, users[0]);
          });
        },
        function(user, done) {
          crypto.randomBytes(20, function(err, buf) {
            var token = buf.toString('hex');
            done(err, token, user)
          })
        },
        function(token, user, done) {
          var expireTime = Date.now() + 24 * 3600000 //1 day
          var expireDate = moment(expireTime).format('YYYY-MM-DD HH:mm:ss');

          connection.query('UPDATE user SET reset_password_token = ?, reset_password_expire = ? WHERE id = ?',
                          [token, expireDate, user['id']], function(err) {
                            done(err, token, user);
                          });
        },
        function(token, user, done) {
          var transporter = nodemailer.createTransport(authConfig.nodeMailer.mandrill);
          console.log(req.headers);
          var mailOptions = {
            to: user['email'],
            from: authConfig.mailOptions.supportEmail,
            subject: '1ClickTrips Password Reset',
            text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
              'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
              'http://' + req.headers.origin + '/en/#/reset/' + token + '\n\n' +
              'If you did not request this, please ignore this email and your password will remain unchanged.\n'
          };

          transporter.sendMail(mailOptions, function(err) {
            console.log(err);
            done(err, 'done');
          });

        }
      ], function(err) {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });

  },

  resetPassword: function(req, res, next) {
    return new Promise(function(resolve, reject) {
      async.waterfall([
        function(done) {
          getUserFromPasswordResetToken(req.body.resetPasswordToken, done);
        },
        function(user, done) {
          var salt = bcrypt.genSaltSync(10);
          var password = bcrypt.hashSync(req.body.newPassword, salt)
          connection.query('UPDATE user set password = ?, reset_password_expire = null, reset_password_token = null WHERE id = ?',
            [password, user['id']], function(err) {
              done(err, user);
            });
        },
        function(user, done) {
          var transporter = nodemailer.createTransport(authConfig.nodeMailer.mandrill);
          var mailOptions = {
            to: user['email'],
            from: authConfig.mailOptions.supportEmail,
            subject: 'Your password has been changed',
            text: 'Hello,\n\n' +
              'This is a confirmation that the password for your account ' + user['email'] + ' has just been changed.\n'
          };
          transporter.sendMail(mailOptions, function(err) {
            done(err);
          });
        }
      ], function(err) {
        if (err) {
          return reject(err);
        }
        resolve();
      });
    });
  },

  validatePasswordResetToken: function(req, passwordResetToken) {
    return new Promise(function(resolve, reject) {
      getUserFromPasswordResetToken(passwordResetToken, function(err, user) {
        if (err) {
          return reject(err);
        }
        resolve(user);
      })
    });
  },

  isLoggedIn: function(req, res, next) {

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
          UserController.getUser(decoded.iss)
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

    var token = req.headers['x-access-token'];

    if (token !== undefined) {
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

    return -1;
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
      return jwt.encode({ iss: req.user.id, exp: expires }, secret);
    }
    return null;
  }


};

function getUserFromPasswordResetToken(passwordResetToken, done) {
  console.log(passwordResetToken);
  connection.query('SELECT * FROM user where reset_password_token = ? AND reset_password_expire > ?',
                  [passwordResetToken, moment().format('YYYY-MM-DD HH:mm:ss')],
                  function(err, rows) {
    console.log(err, rows);
    if (err) {
      return done(err);
    }
    if (!rows || rows.length === 0) {
      return done(new Error('error.invalid.token'));
    }
    done(null, rows[0]);
  });
}
