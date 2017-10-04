module.exports = function(app){
    app.get("/", function(req,res){
        res.render("index")
    });

    app.post("/", function(req,res){

    });

    app.put("/:id", function(req,res){

    })

    app.delete("/:id", function(req, res) {

    });
    
}