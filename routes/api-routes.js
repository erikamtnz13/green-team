var express = require("express");

var router = express.Router();

var db = require("../models");

module.exports = function(app){
    app.get("/", function(req,res){
        db.player.findOne({
                where: {
                        id:1
            }
        }).then(function(result){
            console.log({player: result})
            res.render("index", {player: result})
        })
        
    });

    app.post("/", function(req,res){

    });

    app.put("/:id", function(req,res){

    })

    app.delete("/:id", function(req, res) {

    });
    
}