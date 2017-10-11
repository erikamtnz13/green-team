var db = require("../models");
// Set up MySQL connection:
var mysql = require("mysql")
var connection = mysql.createConnection({
  host: "localhost",
  port: "8889",
  user: "root",
  password: "root",
  database: "game_db"
});

module.exports = function(app) {
  app.get("/api/users", function(req, res) {
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Player
    db.UserInfo.findAll({
      include: [db.Player]
    }).then(function(dbUserInfo) {
      res.json(dbUserInfo);
    });
  });

  app.get("/api/users/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Player
    db.UserInfo.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Player]
    }).then(function(dbUserInfo) {
      res.json(dbUserInfo);
    });
  });
  app.get("/",function(req,res){
    db.UserInfo.findAll({}).then(function(dbPlayer){
      // console.log("GET ROOOT");
      // console.log(dbPlayer);
      res.render("index", dbPlayer);
    });
    
  });
  app.post("/", function(req, res) {
    // console.log("POST root");
    
    //req.body.UserInfo = 3;
    db.UserInfo.create(req.body).then(function(data) {
  
      // window.location = data;
      // console.log(data);
      
      res.redirect("/characters");
    });
  });

  // app.delete("/api/users/:id", function(req, res) {
  //   db.UserInfo.destroy({
  //     where: {
  //       id: req.params.id
  //     }
  //   }).then(function(dbUserInfo) {
  //     res.json(dbUserInfo);
  //   });
  // });

  // Peter's backup plan code to log in:
  app.get("/login", function(req, res) {
    res.render("login");
  });
  // Takes data from post and searches for matching data in DB:
app.post("/auth", function(req, res) {
  var userInput = req.body;
  console.log(userInput)
  var dbQuery = "SELECT * FROM userinfos WHERE name = '" + userInput.name + "' AND password = '" + userInput.password + "';";
  console.log("We've made it this far.")
  connection.query(dbQuery, function(err, result) {
      if (err) throw err;
      // If the username and password are NOT found in the DB:
      console.log(result)
      if (result == false) {
          res.render("not-found"); 
          console.log("can't find your username and password")
      // But if they ARE found:
      } else {
        namePasser = {
          name: userInput.name
        };
          res.render("select", namePasser);
          console.log("found your username and password")
      }
  });
});

};