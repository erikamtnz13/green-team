var db = require("../models");

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
    console.log(req.body)
    //req.body.UserInfo = 3;
    db.UserInfo.create(req.body).then(function(data) {
      // res.json(data)
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

};
