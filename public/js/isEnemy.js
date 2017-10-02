var roll = require("./roll.js");
var isEnemy = function(){
    var isEnemyCheck = false;

    var num = roll(2);
    if(num === 1){
        console.log("no enemy in this room");
        isEnemyCheck = false;

    }
    else if(num === 2){
        console.log("theres something in here")
        isEnemyCheck = true;
    }
    
    return isEnemyCheck;
        
}

module.exports = isEnemy;