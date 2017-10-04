	//***********************************************************************
	//enemies
	var creature = {
		id:0,
		name:"creature",
		eimg:'scr="http://via.placeholder.com/150x150"',
		ekilledImg:'<img class="center-block" id="eimg" src="assets/img/warriorDead.gif" width="150" height="150">',

		ehp:8,
		eitems:[""],
		eattack:0,
		edamage: 0,
		edefense:8,
		xp:+3,
	}


	var skeleton = {
		id:1,
		name:"Weak Skeleton",
		eimg:'assets/img/skel.gif',
		ekilledImg:'assets/img/skelDead.png',

		ehp:10,
		eitems:[""],
		eattack:0,
		edamage:0,
		edefense:1,
		xp:+5,
	}

	var rat = {
		id:2,
		name:"Large Rat",
		eimg:'assets/img/rat.gif',
		ekilledImg:'assets/img/ratDead.png',

		ehp:14,
		eitems:[""],
		eattack:0,
		edamage:1,
		edefense:3,
		xp:+10,
	}

	var thief = {
		id:3,
		name:"Dungeon Keeper",
		eimg:'assets/img/warrior.gif',
		ekilledImg:'assets/img/warriorDead.png',
		edmgImg:'assets/img/warriorDmg.gif',
		ehp:18,
		eitems:[""],
		eattack:0,
		edamage:6,
		edefense:5,
		xp:+25,
	}

	var demonLord = {
		id:4,
		name:"Demon Lord",
		eimg:'assets/img/demon.gif',
		ekilledImg:'assets/img/demonDead.png',

		ehp:35,
		eitems:[""],
		eattack:0,
		edamage:10,
		edefense:8,
		xp:+50,
	}
    var enemiesArray = [creature, skeleton, rat, thief, demonLord];
    
    module.exports = enemiesArray;