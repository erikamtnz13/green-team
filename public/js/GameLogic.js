//================================================================================//
//Game logic for Dungeon Crusade
//Written by Corey Rodems & Stephen Simone (Front End Team) 2017
//Turn Based Dungeon Crawler
//================================================================================//
$(document).ready(function($)
{
	var encounter = false;
	var findPath = false;
	$(".msgRow").hide()
	$("#msgDiv").hide()
	$("#storeDiv").hide()
	$("#shopButton").show()
	$("#hudRow").hide()
	$("#mainGameBox").show()
	$("#lvlUpBtn").hide()
	$("#foundEnemy").hide()
	localStorage.UID = 1;
	const playerUID = localStorage.getItem("UID")



	//================================================================================//
	//Animate.css
	//================================================================================//
	$.fn.extend(
	{
		animateCss: function(animationName)
		{
			var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
			this.addClass('animated ' + animationName).one(animationEnd, function()
			{
				$(this).removeClass('animated ' + animationName);
			});
			return this;
		}
	})



	//================================================================================//
	//Main Loop function
	//================================================================================//
	function Main(player)
	{
		updatePlayer(player)
		$("#headRow").show()
		$("#storeDiv").hide()
		$("#shopButton").show()
		$("#mainGameBox").empty()
		$("#mainGameBox").show()
		$("#lvlUpBtn").hide()
		$("#foundEnemy").hide()
		GenerateScenario(player)
	}


	//================================================================================//
	//Gets the current player object in the database
	//================================================================================//
	var getPlayerData = function(UID)
	{
		return new Promise(function(res, rej)
		{
			$.get("/api/players/" + UID, function(player)
			{
				$("#potionBtnTxt").text(player.gold + " gold")
				$("#dmgStat").text(player.damage + "/15")
				$("#defStat").text(player.defense + "/10")
				$("#accuStat").text(player.attack + "/10")
				$("#playerHP").html(player.hp + " HP")
				$("#playerLevel").html("Player Level: " + player.lvl)
				$("#goldh3").html("Gold: " + player.gold)
				$("#hpPotionsh3").html("Potions: " + player.potions)
				$("#xph3").html("XP: " + player.xp)
				$("#enemiesKilledh3").html("Kills: " + player.enemiesKilled)
				res(player)
			});
		})
	}



	//================================================================================//
	//Calls the database and updates the player object
	//================================================================================//
	var updatePlayer = function(player)
	{
		jQuery.ajax(
		{
			type: 'PUT',
			url: '/api/players/' + player.id,
			data:
			{
				hp: player.hp,
				total_hp: player.total_hp,
				attack: player.attack,
				damage: player.damage,
				defense: player.defense,
				xp: player.xp,
				exp: player.exp,
				lvl: player.lvl,
				potions: player.potions,
				gold: player.gold,
				defGoldNeed: player.defGoldNeed,
				dmgGoldNeed: player.dmgGoldNeed,
				accuGoldNeed: player.accuGoldNeed,
				potionGoldNeed: player.potionGoldNeed,
				enemiesKilled: player.enemiesKilled,
			},
			success: function(result) {
			}
		})
	}



	//================================================================================//
	//Initial HTML Setup
	//================================================================================//
	$("#storeDiv").hide()
	$("#shopButton").show()
	$("#hudRow").hide()
	$("#mainGameBox").show()
	$("#lvlUpBtn").hide()
	$("#foundEnemy").hide()



	//================================================================================//
	//MONSTERS ARRAY
	//================================================================================//
	var monsters = [
		//===========New Enemy===========//
		{
			//----------stats----------//
			id: 1,
			name: "Skeleton",
			hp: 10,
			total_hp: 10,
			attack: 0,
			damage: 0,
			defense: 1,
			items: ['gold', 'potion'],
			xp: +6,
			//----------misc----------//
			img: "/img/skel.gif",
			attackImg: "/img/monsterAttack.gif",
			killedImg: "img/skelDead.png"
		},
		//===========New Enemy===========//
		{
			//----------stats----------//
			id: 2,
			name: "Crazed Rat",
			hp: 14,
			total_hp: 14,
			attack: 0,
			damage: 0,
			defense: 3,
			items: ['gold', 'potion'],
			xp: +11,
			//----------misc----------//
			img: "/img/rat.gif",
			attackImg: "/img/monsterAttack.gif",
			killedImg: "/img/ratDead.png"
		},
		//===========New Enemy===========//
		{
			//----------stats----------//
			id: 3,
			name: "Hard",
			hp: 18,
			total_hp: 18,
			attack: 0,
			damage: 6,
			defense: 5,
			items: ['gold', 'potion'],
			xp: +26,
			//----------misc----------//
			img: "/img/warrior.gif",
			attackImg: "/img/monsterAttack.gif",
			killedImg: "/img/warriorDead.png"
		},
		//===========New Enemy===========//
		{
			//----------stats----------//
			id: 4,
			name: "Very Hard",
			hp: 35,
			total_hp: 35,
			attack: 0,
			damage: 10,
			defense: 7,
			items: ['gold', 'potion'],
			xp: +51,
			//----------misc----------//
			img: "/img/demon.gif",
			attackImg: "/img/monsterAttack.gif",
			killedImg: "/img/demonDead.png"
		},
		//===========New Enemy===========//
		{
			//----------stats----------//
			id: 5,
			name: "Extremely Hard",
			hp: 50,
			total_hp: 50,
			attack: 0,
			damage: 20,
			defense: 9,
			items: ['gold', 'potion'],
			xp: +100,
			//----------misc----------//
			img: "/img/dancingMario.gif",
			attackImg: "/img/monsterAttack.gif",
			killedImg: "/img/marioDead.png"
		},
	]



	//================================================================================//
	//Shop Button Function
	//================================================================================//
	var shopFunc = (player) =>
	{
		$("#storeDiv").show();
		$("#sharpen").show();
		$("#shield").show();
		$("#accu").show();
		$("#shopButton").hide();
		$("#done").show();
		$("#defBtnTxt").text(player.defGoldNeed + " gold");
		$("#dmgBtnTxt").text(player.dmgGoldNeed + " gold");
		$("#accBtnTxt").text(player.accuGoldNeed + " gold");
		$("#potionBtnTxt").text(player.potionGoldNeed + " gold");
	}



	//================================================================================//
	//Hides Shop
	//================================================================================//
	var hideShop = () =>
	{
		$("#done").hide();
		$("#shopButton").show();
		setTimeout(closeShop, 1)

		function closeShop()
		{
			$("#storeDiv").hide();
			$("#shopButton").show();
			$("")
		}
	}



	//================================================================================//
	//Alerts
	//================================================================================//
	var notEnough = () =>
	{
		$(".msgRow").show()
		$("#msgDiv").html('<h2 id="thisAlert" class="alert alert-danger">Not enough gold!</h2>')
		setTimeout(wait, 1800)

		function wait()
		{
			$("thisAlert").remove()
			$(".msgRow").hide(200)
		}
	}
	var noLevel = () =>
	{
		$(".msgRow").show()
		$("#msgDiv").html('<h2 id="thisAlert" class="alert alert-danger">Not enough XP!</h2>')
		setTimeout(wait, 1800)

		function wait()
		{
			$("thisAlert").remove()
			$(".msgRow").hide(200)
		}
	}
	var maxStat = () =>
	{
		$(".msgRow").show()
		$("#msgDiv").html('<h2 id="thisAlert" class="alert alert-danger">This stat is already maxed out!</h2>')
		setTimeout(wait, 1800)

		function wait()
		{
			$("thisAlert").remove()
			$(".msgRow").hide(200)
		}
	}
	var maxPot = () =>
	{
		$(".msgRow").show()
		$("#msgDiv").html('<h2 id="thisAlert" class="alert alert-danger">You are carrying too much!</h2>')
		setTimeout(wait, 1800)

		function wait()
		{
			$("thisAlert").remove()
			$(".msgRow").hide(200)
		}
	}
	var maxHP = () =>
	{
		$(".msgRow").show()
		$("#msgDiv").html('<h2 id="thisAlert" class="alert alert-danger">Your health is at max!</h2>')
		setTimeout(wait, 1800)

		function wait()
		{
			$("thisAlert").remove()
			$(".msgRow").hide(200)
		}
	}

	

	//================================================================================//
	//Buy potion button
	//================================================================================//
	var buyPotion = (player) =>
	{
		if (player.potions <= 10)
		{
			if (player.gold >= player.potionGoldNeed)
			{
				player.potions += 1;
				player.gold -= player.potionGoldNeed;
				player.potionGoldNeed += 10;
				$("#goldh3").html("Gold: " + player.gold);
				$("#hpPotionsh3").html('Potions: ' + player.potions);
				$("#defBtnTxt").text(player.defGoldNeed + " gold");
				$("#dmgBtnTxt").text(player.dmgGoldNeed + " gold");
				$("#accBtnTxt").text(player.accuGoldNeed + " gold");
				$("#potionBtnTxt").text(player.potionGoldNeed + " gold");
				return updatePlayer(player)
			}
			else
			{
				notEnough()
			}
		}
		else
		{
			maxPot()
		}
	}

	//================================================================================//
	//Damage stat button function
	//================================================================================//
	var dmgButton = (player) =>
	{
		if (player.damage <= 15)
		{
			if (player.gold >= player.dmgGoldNeed)
			{
				player.damage += 1;
				player.gold -= player.dmgGoldNeed;
				player.dmgGoldNeed += 25;
				$("#goldh3").html("Gold: " + player.gold);
				$("#dmgStat").text(player.damage + "/15");
				$("#defBtnTxt").text(player.defGoldNeed + " gold");
				$("#dmgBtnTxt").text(player.dmgGoldNeed + " gold");
				$("#accBtnTxt").text(player.accuGoldNeed + " gold");
				$("#potionBtnTxt").text(player.potionGoldNeed + " gold");
				return updatePlayer(player)
			}
			else
			{
				notEnough()
			}
		}
		else
		{
			maxStat()
		}
	}



	//================================================================================//
	//Defense stat button function
	//================================================================================//
	var defButton = (player) =>
	{
		if (player.defense <= 15)
		{
			if (player.gold >= player.defGoldNeed)
			{
				player.defense += 1;
				player.gold -= player.defGoldNeed;
				player.defGoldNeed += 25;
				$("#goldh3").html("Gold: " + player.gold);
				$("#defStat").text(player.defense + "/15");
				$("#defBtnTxt").text(player.defGoldNeed + " gold");
				$("#dmgBtnTxt").text(player.dmgGoldNeed + " gold");
				$("#accBtnTxt").text(player.accuGoldNeed + " gold");
				$("#potionBtnTxt").text(player.potionGoldNeed + " gold");
				return updatePlayer(player)
			}
			else
			{
				notEnough()
			}
		}
		else
		{
			maxStat()
		}
	}



	//================================================================================//
	//Attack(Accuracy) stat button function
	//================================================================================//
	var accuButton = (player) =>
	{
		if (player.attack <= 15)
		{
			if (player.gold >= player.accuGoldNeed)
			{
				player.attack += 1;
				player.gold -= player.accuGoldNeed;
				player.accuGoldNeed += 25;
				$("#goldh3").html("Gold: " + player.gold);
				$("#accuStat").text(player.attack + "/15");
				$("#defBtnTxt").text(player.defGoldNeed + " gold");
				$("#dmgBtnTxt").text(player.dmgGoldNeed + " gold");
				$("#accBtnTxt").text(player.accuGoldNeed + " gold");
				$("#potionBtnTxt").text(player.potionGoldNeed + " gold");
				return updatePlayer(player)
			}
			else
			{
				notEnough()
			}
		}
		else
		{
			maxStat()
		}
	}



	//================================================================================//
	//Player level up function
	//================================================================================//
	var lvlUp = (player) =>
	{
		$("#msgDiv").html("YOU'VE LEVELED UP!")
		if (player.xp <= 75)
		{
			if (player.exp >= 25)
			{
				player.lvl += 1;
				player.total_hp += 5;
				player.hp = player.total_hp;
				player.gold += 75;
				$("#goldh3").html("Gold: " + player.gold);
				$("#eimg").show();
				$("#playerLevel").html("Player Level: " + player.lvl)
				updatePlayer(player)
				setTimeout(waitm, 1000);

				function waitm()
				{
					player.exp = 0;
					$("#msgDiv").empty()
					$("#msgDiv").removeClass("alert alert-success")
					$(".msgRow").hide(200)
					Main(player);
				}
			}
			else
			{
				noLevel()
			}
		}
		else
		{
			if (player.exp >= 75)
			{
				player.lvl += 1;
				player.total_hp += 10;
				player.gold += 150;
				player.hp = player.total_hp;
				$("#goldh3").html("Gold: " + player.gold);
				$("#playerLevel").html("Player Level: " + player.lvl)
				$("#eimg").show();
				updatePlayer(player)
				setTimeout(up, 400);

				function up()
				{
					player.exp = 0;
					$("#msgDiv").empty()
					$("#msgDiv").removeClass("alert alert-success")
					$(".msgRow").hide(200)
					Main(player);
				}
			}
			else
			{
				noLevel()
			}
		}
	}



	//================================================================================//
	//Random Roll
	//================================================================================//
	var GetRandomInt = (min, max) =>
	{
		return Math.floor(Math.random() * (max - min + 1)) + min
	}



	//================================================================================//
	//Heals the player based on HP
	//================================================================================//
	var healPlayer = (player) =>
	{
		let healthMax = player.total_hp - 15
		if (player.hp === player.total_hp)
		{
			maxHP()
		}
		else
		{
			if (player.potions >= 1)
			{
				if (player.hp <= healthMax)
				{
					player.hp += 15;
				}
				else
				{
					player.hp = player.total_hp;
				}
				player.potions = player.potions - 1;
				$("#hpPotionsh3").replaceWith('<h3 id="hpPotionsh3">Potions: ' + player.potions + '</h3>');
				$("#playerHPh3").replaceWith('<h3 id="playerHPh3">' + player.hp + ' HP</h3>')
				updatePlayer(player)
			}
			else
			{
				setTimeout(waitl, 20);

				function waitl()
				{
					maxPot()
				}
			}
		}
	}


	
	//================================================================================//
	//Items array (just gold and potions for the time being)
	//================================================================================//
	var Item = [
		'gold', 'potion'
	]



	//================================================================================//
	//Generates an item from the Item array
	//================================================================================//
	var GenerateItem = (player) =>
	{
		let randNum = GetRandomInt(0, 1)
		let item = Item[randNum]
		switch (item)
		{
			case "gold":
				let goldAmount = GetRandomInt(5, 50)
				player.gold += goldAmount
				setTimeout(waita, 300)

				function waita()
				{
					$("#mainGameBox").append('<h2 id="itemMsg">You found ' + goldAmount + " gold!")
					$("#goldh3").html("Gold: " + player.gold)
					$("#itemMsg").show()
					$("#itemMsg").animateCss("fadeIn")
				}
				updatePlayer(player)
				break
			case "potion":
				player.potions += 1
				setTimeout(waitb, 300)

				function waitb()
				{
					$("#mainGameBox").append('<h2 id="itemMsg">You found a health potion!')
					$("#hpPotionsh3").html("Potions: " + player.potions)
					$("#itemMsg").show()
					$("#itemMsg").animateCss("fadeIn")

				}
				updatePlayer(player)
				break
		}
	}



	//================================================================================//
	//Generates a the paths and buttons for paths
	//================================================================================//
	var GeneratePath = (player) =>
	{
		let newRooms = $(
			'<div class="row"><div class="col-md-12"><span id="newRoomText"></span></div></div><div class="row"> <div class="col-md-4"></div> <div id="whichWay" class="col-md-4"></div> <div class="col-md-4"></div></div>');
		$("#mainGameBox").append(newRooms);
		let randNum = GetRandomInt(1, 4)
		switch (randNum)
		{
			case 1:
				var rooms = ['Northward']
				break
			case 2:
				var rooms = ['Northward', 'Eastward']
				break
			case 3:
				var rooms = ['Northward', 'Eastward', 'Southward']
				break
			case 4:
				var rooms = ['Northward', 'Eastward', 'Southward', 'Westward']
				break
		}
		$("#newRoomText").html("You see " + rooms.length + " cooridors on your path. Choose one.");
		for (var i = 0; i < rooms.length; i++)
		{
			var roomBtn = $("<button>");
			roomBtn.addClass("btn btn-default btn-lg room-button room room-button-color");
			roomBtn.attr("data-room", rooms[i]);
			roomBtn.attr("id", rooms[i]);
			roomBtn.text(rooms[i]);
			$("#whichWay").append(roomBtn);
		}
		GenerateItem(player)
		$(".room").on("click", () =>
		{
			$("#itemMsg").remove()
			updatePlayer(player)
			return Main(player)
		})
	}



	//================================================================================//
	//Generates a path or a fight
	//================================================================================//
	var GenerateScenario = (player) =>
	{
		var randNum = GetRandomInt(1, 2);
		var scenario
		switch (randNum)
		{
			case 1:
				scenario = GenerateMonster(player)
				break
			case 2:
				scenario = GeneratePath(player)
				break
		}
		return scenario
	}



	//================================================================================//
	//Generates a monster from the array for the player to fight
	//================================================================================//
	var GenerateMonster = (player) =>
	{
		$("#mainGameBox").empty()
		let randNum = GetRandomInt(0, 4)
		if (player.lvl <= 1)
		{
			var monster = monsters[GetRandomInt(0, 1)];
		}
		else if (player.lvl >= 2)
		{
			var monster = monsters[GetRandomInt(0, 2)];
		}
		else if (player.lvl >= 3)
		{
			var monster = monsters[GetRandomInt(1, 4)];
		}
		$("#mainGameBox").append('<h2 class="monsterTxt">Something is stirring in the darkness.</h2><br><h3 class="monsterTxt"> Brace yourself traveler!</h3>')
		setTimeout(waitCombat, 2100)

		function waitCombat()
		{
			//====================
			//HTML WORK FOR COMBAT
			//====================
			$(".monsterTxt").remove()
			var enemyAppearText = ('<div class="row"><div id="playerImg" class="col-md-6"><h2 id=playerName></h2></div>' +
				'<div id="appearEnemy" class="col-md-6"></div></div>')
			var attackRow = (
				'<div class="row">' +
				'<div class="col-md-12 id="attackRow">' +
				'<h2 id="playerAttack"></h2><h2 id="playerDamage"></h2>' + '<h2 id="enemyAttack"></h2><h2 id="enemyDamage"></h2>' +
				'</div></div>')
			$("#playerHP").hide()
			$("#attackRow").animateCss("fadeIn");
			$("#mainGameBox").append(enemyAppearText);
			$("#appearEnemy").append('<h3 id="killed"></h3>');
			$("#killed").hide();
			$("#mainGameBox").animateCss("zoomIn");
			$("#playerImg").show()
			$("#playerImg").append('<img src="' + player.char_idle + '" class="img-fluid" width="200" height="200" id="playerImgs">' + '<h3 id="playerHPh3">' + player.hp + ' HP</h3>')
			$("#playerName").html(player.name)
			$("#appearEnemy").append("<h2 id=enemyName>" + monster.name + "</h2>");
			$("#appearEnemy").append('<img class="center-block" id="eimg" class="img-fluid" src="' + monster.img + '" width="200" height="200">');
			$("#appearEnemy").append('<h3 id="enemyHpH3">' + monster.hp + ' HP</h3>');
			$("#mainGameBox").append('<div class="row"> <div class="col-md-12"></div> <div id="combatBtnDiv" class="col-md-4"><button type="button" id="attackBtn" class="center-block btn btn-danger">Attack!</button></div><div class="col-md-4"></div></div>');
			$("#mainGameBox").append('<div class="row"> <div class="col-md-12"></div> <div id="combatBtnDiv" class="col-md-4"><button type="button" id="waitAttackBtn" class="center-block btn btn">Wait...</button></div><div class="col-md-4"></div></div>');
			$("#waitAttackBtn").hide();
			$("#eimg").show();
			$("#enemyInfo").show();
			$("#playerAttack").show();
			$("#playerDamage").show();
			$("#enemyDamage").show();
			$("#enemyAttack").show();
			$("#mainGameBox").append(attackRow)
			$("#shopButton").hide();
			$("#eimg").show();
			$("#attackBtn").on("click", () =>
			{
				combat(monster, player);
			});
		}
	}



	//================================================================================//
	//After combat messages and functions
	//================================================================================//
	var afterCombat = (player, monster, giveXP) =>
	{
		console.log("====================UPDATE PLAYER AFTER COMBAT====================")
		updatePlayer(player)
		let dead = monster.killedImg
		let monsterName = monster.name
		var afterCombatRow = $('<div class="row container" id="acRow">')
		var afterCombatDiv = $('<div id="monsterKilled" class="col-md-12">')
		$("#mainGameBox").empty()
		$("#mainGameBox").animateCss("fadeIn")
		$("#mainGameBox").append(afterCombatRow)
		$("#acRow").append(afterCombatDiv)
		$("#enemyName").hide()
		$("#monsterKilled").prepend('<img class="mx-auto d-block" id="killedImg" src="' + dead + '" width="200" height="200">')
		$("#monsterKilled").append("<h2 class='text-center mx-auto d-block'>You've killed " + monsterName + "!</h2")
		setTimeout(waita, 1000)

		function waita()
		{
			$("#monsterKilled").append("<h3 class='mx-auto d-block text-center'>You gained " + giveXP + " XP!</h3>")
			$("#xph3").html("XP: " + player.xp)
			$("#enemiesKilledh3").html("Killed: " + player.enemiesKilled)

			//=====================
			//RESETS MONSTER HEALTH
			//=====================
			function regen(monster)
			{
				monster.hp = monster.total_hp
			}
			if (player.xp <= 75)
			{
				if (player.exp >= 25)
				{
					$("#headRow").hide(300)
					$(".msgRow").show()
					$("#msgDiv").show(200)
					$("#msgDiv").addClass("alert alert-success")
					$("#msgDiv").html("You can level up! Click the level up button!")
					regen(monster)
					$("#lvlUpBtn").show()
					$("#mainGameBox").hide()
					setTimeout(waity, 3000)

					function waity()
					{
						$("#killed").hide(400)
						$("#eimg").hide()
					}
				}
				else
				{
					regen(monster)
					setTimeout(waity, 2000)

					function waity()
					{
						$("#killed").hide(400)
						$("#eimg").hide()
						setTimeout(returnGame, 1000)

						function returnGame()
						{
							updatePlayer(player)
							return Main(player)
						}
					}
				}
			}
			else
			{
				if (player.exp >= 75)
				{
					$("#headRow").hide(300)
					$(".msgRow").show()
					$("#msgDiv").show(200)
					$("#msgDiv").addClass("alert alert-success")
					$("#msgDiv").html("You can level up! Click the level up button!")
					regen(monster)
					$("#lvlUpBtn").show()
					$("#mainGameBox").hide()
					setTimeout(waity, 3000)

					function waity()
					{
						$("#killed").hide(400)
						$("#eimg").hide()
					}
				}
				else
				{
					regen(monster)
					setTimeout(waity, 2000)

					function waity()
					{
						$("#killed").hide(400)
						$("#eimg").hide()
						setTimeout(returnGame, 1000)

						function returnGame()
						{
							updatePlayer(player)
							return Main(player)
						}
					}
				}
			}
		}
	}



	//================================================================================//
	//Combat Function
	//================================================================================//
	function combat(monster, player)
	{
		$("#shopButton").hide()
		$("#eimg").show()
		$("#attackBtn").hide()
		$("#waitAttackBtn").show()
		setTimeout(waitx, 3400)

		function waitx()
		{
			$("#waitAttackBtn").hide()
			$("#attackBtn").show()
		}
		var pAttack = player.attack + GetRandomInt(1, 20)
		if (pAttack > monster.defense)
		{
			var pDamage = player.damage + GetRandomInt(1, 8)
			$("#playerDamage").replaceWith('<h4 id="playerDamage">You did ' + pDamage + ' damage to ' + monster.name + '!</h4>')
			$("#playerDamage").show()
			$("#playerDamage").animateCss("fadeInUp")
			$("#playerImgs").replaceWith('<img src="' + player.char_attack + '" class="img-fluid" width="200" height="200" id="playerImgs">')
			$("#eimg").replaceWith('<img src="' + player.char_spell + '" class="img-fluid" width="200" height="200" id="eimg">')
			setTimeout(waitv, 1600)

			function waitv()
			{
				$("#playerDamage").animateCss("fadeOutUp")
				$("#playerImgs").replaceWith('<img src="' + player.char_idle + '" class="img-fluid" width="200" height="200" id="playerImgs">')
				$("#eimg").replaceWith('<img src="' + monster.img + '" class="" width="200" height="200" id="eimg">')
				setTimeout(playerHideAttack, 600)

				function playerHideAttack()
				{
					$("#playerDamage").hide()
				}
			}
			monster.hp -= pDamage
			$("#enemyHpH3").replaceWith('<h3 id="enemyHpH3">' + monster.hp + " HP</h3>")
		}
		else
		{
			$("#playerAttack").show()
			$("#playerAttack").animateCss("shake")
			$("#playerAttack").replaceWith('<h3 id="playerAttack">' + monster.name + ' dodged your attack!</h3>')
			setTimeout(waitm, 1600)

			function waitm()
			{
				$("#playerAttack").animateCss("fadeOut")
				setTimeout(playerHideMiss, 600)

				function playerHideMiss()
				{
					$("#playerAttack").hide()
				}
			}
		}
		if (monster.hp >= 1)
		{
			setTimeout(waitz, 1800)

			function waitz()
			{
				var eAttack = monster.attack + GetRandomInt(1, 20)
				if (eAttack > player.defense)
				{
					var eDamage = monster.damage + GetRandomInt(1, 6)
					$("#playerImgs").replaceWith('<img src="' + monster.attackImg + '" class="img-fluid" width="200" height="200" id="playerImgs">')
					$("#enemyDamage").replaceWith('<h4 id="enemyDamage">' + monster.name + ' did ' + eDamage + ' damage to you!</h4>')
					$("#enemyDamage").show()
					$("#enemyDamage").animateCss("fadeInUp")
					setTimeout(waitx, 1600)

					function waitx()
					{
						$("#enemyDamage").animateCss("fadeOutUp")
						$("#playerImgs").replaceWith('<img src="' + player.char_idle + '" class="img-fluid" width="200" height="200" id="playerImgs">')
						setTimeout(hideEnemyAttack, 600)

						function hideEnemyAttack()
						{
							$("#enemyDamage").hide()
						}
					}
					player.hp -= eDamage
					updatePlayer(player)
					$("#playerHPh3").replaceWith('<h3 id="playerHPh3">' + player.hp + " HP</h3>")
					if (player.hp < 1)
					{
						$("#hudRow").hide()
						$("#attackBtn").hide()
						$("#waitAttackBtn").hide()
						$("#playerAttack").hide()
						$("#playerDamage").hide()
						$("#enemyName").hide()
						$("#shopButton").hide()
						$("#playerHPh3").html('0 HP')
						$("#playerImgs").replaceWith('<img src="/img/rip.png" class="img-fluid" width="200" height="200" id="playerImgs">')
						setTimeout(dead,1900)
						function dead(){
							return youAreDead(player)
						}

					}
				}
				else
				{
					$("#enemyAttack").replaceWith('<h4 id="enemyAttack">' + monster.name + ' Missed their attack!</h4>')
					$("#enemyAttack").show()
					$("#enemyAttack").animateCss("fadeInUp")
					setTimeout(waitg, 1200)

					function waitg()
					{
						$("#enemyAttack").animateCss("fadeOutUp")
						setTimeout(hideEnemyMiss, 600)

						function hideEnemyMiss()
						{
							$("#enemyAttack").hide(200)
						}
					}
				}
			}
		}
		else if (monster.hp <= 0)
		{
			$("#playerDamage").replaceWith('<h4 id="playerDamage">You did ' + pDamage + ' damage to ' + monster.name + '!</h4>')
			$("#enemyHpH3").html("0 HP")
			setTimeout(wait, 1800)

			function wait()
			{
				var giveXP = monster.xp
				player.xp += giveXP
				player.exp += giveXP
				player.enemiesKilled += 1
				updatePlayer(player)
				setTimeout(waiting, 800)

				function waiting()
				{
					afterCombat(player, monster, giveXP)
				}
			}
		}
	}



	var youAreDead = (player) =>{
		$("#mainGameBox").empty()
		$("#hudRow").hide()
		var deadDiv = $("<div class='row'><div class='col-md-12' id='deadDiv'></div></div><div class='row'><div id='playAgain' class='col-md-12'></div></div>")
		$("#mainGameBox").append(deadDiv)
		$("#deadDiv").append("<h1>YOU ARE DEAD</h1>")
		$("#deadDiv").append("<p class='text-center'>The dungeon claims another soul.</p>")
		$("#deadDiv").append("<h2>Play again?</h2>")
		$("#playAgain").append("<button class='text-center mx-auto d-block btn btn-warning' id='playYes'>Yes</button><button class='text-center mx-auto d-block btn btn-warning' id='playNo'>No</button>")

	
		$("#playYes").on("click", function(){
			window.location.replace("/")
		})
	
		$("#playNo").on("click", function(){
			window.location.replace("/")
		})
	}



	//================================================================================//
	//Starts the game and gets the player data
	//================================================================================//
	$("#enterDunBtn").on("click", function(e)
	{
		getPlayerData(playerUID).then(function(player)
		{
			$("#mainGameBox").empty(200)
			$("#mainGameBox").append("<h2 class='welcomeTxt'>Good Luck Traveler....</h2>")
			setTimeout(waitA, 1800)

			function waitA()
			{
				$(".welcomeTxt").html("You will need it")
				setTimeout(waitB, 1200)

				function waitB()
				{
					$(".welcomeTxt").animateCss("fadeOut")
				}
			}
			setTimeout(toGame, 4000)

			function toGame()
			{
				$("#playerHP").show()
				$("#navSpan").html("Welcome " + player.name)
				$("#hudRow").show()
				$("#potionBtnTxt").text(player.potionGoldNeed + " gold")
				$("#dmgStat").text(player.damage + "/15")
				$("#defStat").text(player.defense + "/10")
				$("#accuStat").text(player.attack + "/10")
				$("#playerHP").html(player.hp + " HP")
				$("#playerLevel").html("Player Level: " + player.lvl)
				$("#goldh3").html("Gold: " + player.gold)
				$("#hpPotionsh3").html("Potions: " + player.potions)
				$("#xph3").html("XP: " + player.xp)
				$("#enemiesKilledh3").html("Kills: " + player.enemiesKilled)
				$("#mainGameBox").replaceWith('<div class="col-md-12" id="mainGameBox">')
				$("#whichWay").show()
				$("#potionBtn").on("click", () =>
				{
					buyPotion(player)
				});
				$("#shopButton").on("click", () =>
				{
					shopFunc(player)
				});
				$("#done").on("click", () =>
				{
					hideShop()
				});
				$(".potionButton").on("click", () =>
				{
					healPlayer(player)
				})
				$("#dmgBtn").on("click", function()
				{
					dmgButton(player)
				});
				$("#defBtn").on("click", function()
				{
					defButton(player)
				});
				$("#accBtn").on("click", function()
				{
					accuButton(player)
				});
				$("#lvlUpBtn").on("click", function()
				{
					lvlUp(player)
				});
				Main(player);
			}
		})
	})
})

