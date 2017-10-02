var roll = function(max){
    var number = Math.floor((Math.random() * max) + 1);
    return number;
}

module.exports = roll;
