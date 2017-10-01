var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

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

app.engine("handlebars", exphbs({
	defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// Import routes and give the server access to them.
require("./routes/api-routes.js")(app);


db.sequelize.sync({ force: true }).then(function() {
	app.listen(PORT, function() {
	  console.log("App listening on PORT " + PORT);
	});
  });