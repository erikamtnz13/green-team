//***********************************************************************
//enemies
var enemies = [
//===========New Enemy===========//
	{
		//----------stats----------//
		id: 1,
		name: "Easy",
		hp: 10,
		attack: 0,
		damage: 0,
		defense: 1,
		items: ['gold','potion'],
		xp: +5,
		//----------misc----------//
		img: "",
		dmgImg: "",
		killedImg: ""
	},

	//===========New Enemy===========//
	{
		//----------stats----------//
		id: 2,
		name: "Medium",
		hp: 14,
		attack: 0,
		damage: 1,
		defense: 3,
		items: ['gold','potion'],
		xp: +10,
		//----------misc----------//
		img: "",
		dmgImg: "",
		killedImg: ""
	},

	//===========New Enemy===========//
	{
		//----------stats----------//
		id: 3,
		name: "Hard",
		hp: 18,
		attack: 0,
		damage: 6,
		defense: 5,
		items: ['gold','potion'],
		xp: +25,
		//----------misc----------//
		img: "",
		dmgImg: "",
		killedImg: ""
	},

	//===========New Enemy===========//
	{
		//----------stats----------//
		id: 4,
		name: "Very Hard",
		hp: 35,
		attack: 0,
		damage: 10,
		defense: 7,
		items: ['gold','potion'],
		xp: +50,
		//----------misc----------//
		img: "",
		dmgImg: "",
		killedImg: ""
	},

	//===========New Enemy===========//
	{
		//----------stats----------//
		id: 5,
		name: "Extremely Hard",
		hp: 50,
		attack: 0,
		damage: 20,
		defense: 9,
		items: ['gold','potion'],
		xp: +100,
		//----------misc----------//
		img: "",
		dmgImg: "",
		killedImg: ""
	},

];

module.exports = enemies;

// var createEnemy = function(enemies,name,hp,attack,damage,defense,items,xp,img,dmgImg,killedImg){
//     this.id = enemies.length  1 ;
//     this.name = name;
//     this.hp = hp;
//     this.attack = attack;
//     this.damage = damage;
//     this.defense = defense;
//     this.items = items;
//     this.xp = (enemies[enemies.length - 1].xp) * 2;
//     this.img = img;
//     this.dmgImg = dmgImg;
//     this.killedImg = killedImg; 
// }