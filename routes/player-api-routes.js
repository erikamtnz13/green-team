// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  app.get("/scores",function(req,res){
    db.Player.findAll({}).then(function(dbPlayer){
      console.log(dbPlayer);
      res.render("scores", dbPlayer);
    });
    
  });
  app.get("/characters",function(req,res){
    db.Player.findAll({}).then(function(dbPlayer){
      console.log(dbPlayer);
      res.render("characters", dbPlayer);
    });
    
  });
  app.post("/characters", function(req, res) {
    console.log(req.body)
    // req.body.UserInfoId = 3;
    db.Player.create(req.body).then(function(data) {
      // res.json(data)
      res.redirect("/game");
    });
  });

  // GET route for getting all of the posts
  app.get("/api/players", function(req, res) {
    var query = {};
    if (req.query.userInfo_id) {
      query.userInfo_id = req.query.userInfo_id;
    }

    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.Player.findAll({
      where: query,
      include: [db.UserInfo.id]
    }).then(function(dbPlayer) {
      res.json(dbPlayer);
    });
  });

  // Get rotue for retrieving a single post
  app.get("/api/players/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.Player.findOne({
      where: {
        id: req.params.id
      },
      include: [db.UserInfo.id]
    }).then(function(dbPlayer) {
      res.json(dbPlayer);
    });
  });

  // POST route for saving a new post
  app.post("/api/players", function(req, res) {
    db.Player.create(req.body).then(function(dbPlayer) {
      res.json(dbPlayer);
    });
  });

  // DELETE route for deleting posts
  app.delete("/api/players/:id", function(req, res) {
    db.Player.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbPlayer) {
      res.json(dbPlayer);
    });
  });

  // PUT route for updating posts
  app.put("/api/players", function(req, res) {
    db.Player.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbPlayer) {
        res.json(dbPlayer);
      });
  });
  app.get("/api/scores", function(req, res) {
    var query = {};
    db.Player.findAll({}).then(function(dbPlayer) {
      res.json(dbPlayer);
    });
  });

};
