// server.js

// set up ======================================================================
var express       = require('express'),
    passport      = require('passport'),
    session       = require('express-session'),
    morgan        = require('morgan'),
    cookieParser  = require('cookie-parser'),
    bodyParser    = require('body-parser');

// initiate server instance
var app = express();

// configuration ===============================================================
var configAuth = require('./config/auth');
var port = process.env.PORT || 8080;

require('./config/passport')(passport); // pass passport for configuration


/**
 * General server setup is happening here
 */
function setupServer() {

    app.use(morgan('dev')); // log every request to the console
    app.use(bodyParser.urlencoded({ // parse application/x-www-form-urlencoded
      extended: false
    }));
    app.use(bodyParser.json());     // parse application/json
    app.use(cookieParser());
    app.use(session({
      secret: 'errare humanum est',
      cookie: {
        httpOnly: true,
        secure: false, // https required for setting it to true
        maxAge: null // session cookie: is deleted after closing the browser
      },
      resave: false,
      saveUninitialized: false // passport will take care
      /* store: e.g. Redis Store */ // redis store for session data
    }));

    app.set('jwtTokenSecret', configAuth.secret);
}

/**
 * Setup Passport for authentication functionality
 */
function setupAuthentication() {
    app.use(passport.initialize());
    app.use(passport.session()); // persistent login sessions required for Twitter auth
}

/**
 * Start Express
 */
function start () {
  setupServer();
  setupAuthentication();
    
	// load routes with fully configured express and passport
  require('./app/routes/app.js')(app);
  require('./app/routes/auth.js')(app, express, passport);
	require('./app/routes/search.js')(app, express);
  require('./app/routes/user.js')(app, express);

  app.listen(port);
  console.log('\tServer started on port ' + port + '.');
}

// start the server ============================================================
start();
