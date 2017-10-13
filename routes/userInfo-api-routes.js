var db = require("../models");

// passed passport in as an argument vs requiring it again
module.exports = function(app, passport) {
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
  app.post("/",passport.authenticate('local'), function(req, res) {
    // console.log("POST root");
    console.log(req.user)
    
    // console.log(req.body)
    //req.body.UserInfo = 3;
    
  
      // window.location = data;
      // console.log(data);
      
      res.render("characters",req.user);
    // });
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

};