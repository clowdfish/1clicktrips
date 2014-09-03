// set up ======================================================================
var express  = require('express'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    flash 	 = require('connect-flash');

var morgan       = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser   = require('body-parser'),
    session      = require('express-session');

var configDB     = require('./config/database.js');

var app     = express();
var port    = process.env.PORT || 8080;

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

app.set('jwtTokenSecret', 'theanswertoallquestions42.whatwas23for?');

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

app.set('view engine', 'ejs'); // set up ejs as templating engine

// required for passport
// TODO is the session secret and cookie parser still required?
app.use(session({ secret: 'theanswertoallquestions42.whatwas23for?' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport + jwt

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);

