var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var passport = require('passport');
var passportMiddleware = require('express-passport');
var LocalStrategy = require('passport-local').Strategy;

var PORT = process.env.PORT || 3000;

var app = express();
var db = require("./models");
// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static("public"));

app.use(bodyParser.urlencoded({
	extended: false
}));

// Override with POST having ?_method=DELETE
app.use(methodOverride("_method"));

// Set Handlebars.
var exphbs = require("express-handlebars");

app.use(require('express-session')({
	secret: 'jyny',
	resave: true,
	saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session()); //

app.engine("handlebars", exphbs({
	defaultLayout: "main"
}));
app.set("view engine", "handlebars");


passport.use('local', new LocalStrategy({
	passReqToCallback: true
  },
  function( req, username, password, done) {
    // request object is now first argument
	// ...)
		if (!req.user){
			db.UserInfo.create(req.body).then(function(data) {
				return done(null, data);
			});
		} else {
			return done(null,req.user);
		}
	}
	));

// Configure Passport authenticated session persistence.
//
// In order to restore authentication state across HTTP requests, Passport needs
// to serialize users into and deserialize users out of the session.  The
// typical implementation of this is as simple as supplying the user ID when
// serializing, and querying the user record by ID from the database when
// deserializing.
passport.serializeUser(function(user, cb) {
	cb(null, user.id);
  });

passport.deserializeUser(function (id, cb) {
	// changed this to a .then vs a callback, the call back was not being executed correctly
	db.UserInfo.findById(id).then(function (user) {
		if (user) {
			// the example I saw had .get added to user here, works either way though
			cb(null, user.get());
		}
		else {
			cb(user.errors, null);
		}
	});
});




// Import routes and give the server access to them.
require("./routes/html-routes.js")(app);
require("./routes/userInfo-api-routes.js")(app, passport);
require("./routes/player-api-routes.js")(app);
///////
db.sequelize.sync({ force: true }).then(function() {
	app.listen(PORT, function() {
	  console.log("App listening on PORT " + PORT);
	});
});
