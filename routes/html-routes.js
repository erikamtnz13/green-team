var path = require("path");

module.exports = function(app){
    app.get("/game", function(req, res) {
        res.sendFile(path.join(__dirname+'/../public/html/game.html'))
    });

}