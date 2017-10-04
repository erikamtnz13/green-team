var path = require("path");

module.exports = function(app){
    app.get("/game", function(req, res) {
        res.sendFile(path.join(__dirname+'/game.html'))
    });
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname+'/login.html'))
    });
    app.get("/scores", function(req, res) {
        res.sendFile(path.join(__dirname+'/game.html'))
    });
}