$(document).ready(function($){

    $("#storeDiv").hide()
    $("#shopButton").show()
    $("#hudRow").hide()
    $("#mainGameBox").show()
    $("#lvlUpBtn").hide()
    $("#foundEnemy").hide()

var enemiesKilled = 0
var exp = 0

var monsters = [
    //===========New Enemy===========//
        {
            //----------stats----------//
            id: 1,
            name: "Easy",
            hp: 10,
            total_hp: 10,
            attack: 0,
            damage: 0,
            defense: 1,
            items: ['gold','potion'],
            xp: +5,
            //----------misc----------//
            img: "/img/skel.gif",
            dmgImg: "",
            killedImg: "img/skelDead.png"
        },
    
        //===========New Enemy===========//
        {
            //----------stats----------//
            id: 2,
            name: "Medium",
            hp: 14,
            total_hp: 14,
            attack: 0,
            damage: 1,
            defense: 3,
            items: ['gold','potion'],
            xp: +10,
            //----------misc----------//
            img: "/img/rat.gif",
            dmgImg: "",
            killedImg: ""
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
            total_hp: 35,
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
            total_hp: 50,
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
    var Item = [
        'gold','potion'
    ]
    var continueGame = true

    var updatePlayer = (player) => {
        jQuery.ajax({
            type: 'PUT',
            url: '/api/players/'+ player.id,
            data: {
                hp: player.hp,
                total_hp: player.total_hp,
                attack: player.attack,
                damage: player.damage,
                defense: player.defense,
                xp: player.xp,
                lvl: player.lvl,
                potions: player.potions,
                gold: player.gold 
            },
            success: function(result) {
                console.log("RESULT: " + result)
                
            }
        })
        
    }
    var getPlayerData = (player) =>{
        $.get( "/api/players/1", function( player ) {
            console.log(player)
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
        })
    }

    

    $("#Done").click((e) =>
    {
        continueGame = e.target.value
    })

    var GetRandomInt = (min, max) =>
    {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    var GenerateMonster = (player) =>
    {
        let randNum = GetRandomInt(0,4) 
        let monster = monsters[0]
        $("#shopButton").hide();
        
        var enemyAppearText = ('<div class="row"> <div id="playerInfo" class="col-md-4"><h2 id="playerAttack"></h2><h2 id="playerDamage"></h2></div> <div id="appearEnemy" class="col-md-4"></div> <div id="enemyInfo" class="col-md-4"><h2 id="enemyAttack"></h2><h2 id="enemyDamage"></h2></div></div>');
		$("#mainGameBox").append(enemyAppearText);
		$("#appearEnemy").append('<h3 id="killed"></h3>');
		$("#killed").hide();
		$("#mainGameBox").show();

		$("#appearEnemy").append("<h2 id=enemyName>" + monster.name + "</h2>");
		$("#appearEnemy").append('<img class="center-block" id="eimg" src="'+ monster.img + '" width="150" height="150">');
		$("#appearEnemy").append('<h3 id="enemyHpH3">' + monster.hp + ' HP</h3>');
		$("#appearEnemy").append('<div class="row"> <div class="col-md-4"></div> <div id="combatBtnDiv" class="col-md-4"><button type="button" id="attackBtn" class="center-block btn btn-danger">Attack!</button></div><div class="col-md-4"></div></div>');
		$("#appearEnemy").append('<div class="row"> <div class="col-md-4"></div> <div id="combatBtnDiv" class="col-md-4"><button type="button" id="waitAttackBtn" class="center-block btn btn">Wait...</button></div><div class="col-md-4"></div></div>');
		$("#waitAttackBtn").hide();
		console.log("Test enemy HP: " + monster.hp);
		$("#eimg").show();
		$("#enemyInfo").show();
		$("#playerAttack").show();
		$("#playerDamage").show();
		$("#enemyDamage").show();
		$("#enemyAttack").show();
		

		
		$("#attackBtn").on("click", function(){
				combat(monster, player);
			});
    }

    var GenerateItem = () =>
    {
        let randNum = GetRandomInt(0,1) 
        let item = Item[randNum]
        console.log("ITEM: " + item)
        
    }

    var GeneratePath = (player) =>
    {
        var newRooms = $(
            '<div class="row"><div class="col-md-12"><span id="newRoomText"></span></div></div><div class="row"> <div class="col-md-4"></div> <div id="whichWay" class="col-md-4"></div> <div class="col-md-4"></div></div>');
        $("#mainGameBox").append(newRooms);
        let randNum = GetRandomInt(1,4) 
        switch(randNum){
            case 1: var rooms = ['Northward']
            break
            case 2: var rooms = ['Northward','Eastward']
            break
            case 3: var rooms = ['Northward','Eastward','Southward']
            break
            case 4: var rooms = ['Northward','Eastward','Southward','Westward']
            break
        }
        $("#newRoomText").html("You see " + rooms.length+ " cooridors on your path. Choose one.");
        
        for(var i = 0; i < rooms.length; i++){
            var roomBtn = $("<button>");
            roomBtn.addClass("btn btn-default btn-lg room-button room room-button-color");
            roomBtn.attr("data-room", rooms[i]);
            roomBtn.attr("id", rooms[i]);
            roomBtn.text(rooms[i]);
            $("#whichWay").append(roomBtn);
            
            $(".room").on("click", function(){
                GenerateItem()
                updatePlayer(player)
                getPlayerData(player)
                Main(player)
        })
    }
    }

    var GenerateScenario = (player) =>
    {
        var randNum = GetRandomInt(1,2);
        var scenario
        
        switch(randNum)
        {
            case 1: scenario = GenerateMonster(player)
            break
            case 2: scenario = GeneratePath(player)
            break
        }

        return scenario    
    }

   


        function combat(monster, player){

            $("#eimg").show()
            $("#attackBtn").hide()
            $("#waitAttackBtn").show()
            setTimeout(waitx, 3000)
                function waitx(){
                    $("#waitAttackBtn").hide()
                    $("#attackBtn").show()
                }
            
            var pAttack = player.attack + GetRandomInt(1,20)
            console.log("PATTACK: " + pAttack)
            
            if(pAttack > monster.defense){

                var pDamage = player.damage + GetRandomInt(1,8)
                console.log("PDAMAGE: " + pDamage)
                $("#playerDamage").show()
                $("#playerDamage").replaceWith('<h4 id="playerDamage">You did ' + pDamage +' damage to ' + monster.name + '!</h4>')
                setTimeout(waitv, 1600)
                    function waitv(){
                        $("#playerDamage").hide(200)
                    }
                monster.hp -= pDamage
                $("#enemyHpH3").replaceWith('<h4 id="enemyHpH3">' + monster.hp + " HP</h4>")

            }
            
            else{
                $("#playerAttack").show()
                $("#playerAttack").replaceWith('<h3 id="playerAttack">' + monster.name + ' dodged your attack!</h3>')
                console.log("Missed attack. Attack roll " + pAttack + " < " + monster.defense)
                setTimeout(waitm, 1500)
                    function waitm(){
                        $("#playerAttack").hide(200)
                    }
            }	
            if(monster.hp >= 1){

                console.log("MONSTER: " + monster + "\nPLAYER: " + player )
                    setTimeout(waitz, 1200)
                        function waitz(){
                                        
                        var eAttack = monster.attack + GetRandomInt(1,20)
                        console.log("EATTACK: " + eAttack)
                                                                     
                        if(eAttack > player.defense){

                            var eDamage = monster.damage + GetRandomInt(1,6)
                            console.log("EDAMAGE: " + eDamage)
                            $("#enemyDamage").show()
                            $("#enemyDamage").replaceWith('<h4 id="enemyDamage">' + monster.name + ' did ' + eDamage +' damage to you!</h4>')
                            setTimeout(waitb, 1300)
                                function waitb(){
                                    $("#enemyDamage").hide(200)
                                }
                            player.hp -= eDamage
                            console.log("player hp: " + player.hp)
                            $("#playerHP").replaceWith('<h2 id="playerHP">' + player.hp + " HP</h3>")
                            if(player.hp < 1){
                                $("#mainGameBox").hide()
                                $("#attackBtn").hide()
                                $("#waitAttackBtn").hide()
                                $("#playerAttack").hide()
                                $("#playerDamage").hide()
                                $("#enemyName").hide()
                                $("#playerHP").replaceWith('<h2 id="playerHP">YOU ARE DEAD</h2>')
                                    
                                setTimeout(waity, 2800)
                                function waity(){
                                    var death = confirm("You have been killed. Play again?")
                                    if (death){
                                        window.location.replace("game.html")
                                    }
                                    else{
                                        window.location.replace("index.html")
                                    }
                                }
                            }

                        }
                        else{
                            $("#enemyAttack").show()
                            $("#enemyAttack").replaceWith('<h4 id="enemyAttack">' + monster.name + ' Missed their attack!</h4>')
                            console.log("Missed attack. Attack roll " + eAttack + " < " + player.defense)
                            setTimeout(waitg, 1200)
                                function waitg(){
                                    $("#enemyAttack").hide(200)
                                }
                        }
                    }
            }
            else if(monster.hp <= 0){
                $("#combatBtnDiv").hide()
                // $("#playerAttack").hide()
                // $("#playerDamage").hide()
                $("#enemyName").hide()
                $("#enemyHpH3").replaceWith('<h3 id="enemyHpH3">' + "0 HP</h3>")
                $("#eimg").replaceWith('<img class="center-block" id="eimg" src="'+ monster.killedImg + '" width="150" height="150">')
                $("#killed").show()
                $("#killed").html("You've killed " + monster.name + "!")
                setTimeout(waitk, 1800)
                function waitk(){
                    $("#killed").html("You gained " + monster.xp + " XP!")
                }
                enemiesKilled += 1
                player.xp += monster.xp
                console.log("Player XP: " + player.xp)
                console.log("Enemies Killed: " + enemiesKilled)
                $("#xph3").html("XP: " + player.xp)
                exp += monster.xp
                console.log("EXP POOL: " + exp)
                $("#enemiesKilledh3").html("Killed: " + enemiesKilled)
                console.log("You've killed " + monster.name + "!")
                                                
                updatePlayer(player)

                function regen(monster){
                    monster.hp = monster.total_hp
                    console.log("monster enemy for regen: " + monster.name);
                    console.log("HP now?: " + monster.hp);
                    }
            
                    
                    if(player.xp <= 75){
                        if(exp >= 25){
                            setTimeout(waitlv, 10)
                            function waitlv(){
                                alert("You can level up!")
                            }
                            regen(monster)
                            $("#lvlUpBtn").show()
                            $("#mainGameBox").hide()
                            setTimeout(waity, 3000)
                            function waity(){
                                $("#killed").hide(400)
                                $("#eimg").hide()
                                
                            }
                        }
                        else{
                            regen(monster)
                            setTimeout(waity, 2800)
                            function waity(){
                                $("#killed").hide(400)
                                $("#eimg").hide()
                                Main(player)
                            }
                        }
                    }
                    else{

                        if(exp >= 75){
                            setTimeout(waitlv, 10)
                            function waitlv(){
                                alert("You can level up!")
                            }
                            regen(monster)
                            $("#lvlUpBtn").show()
                            $("#mainGameBox").hide()
                            setTimeout(waity, 3000)
                            function waity(){
                                $("#killed").hide(400)
                                $("#eimg").hide()
                                
                            }
                        }
                        else{
                            regen(monster)
                            setTimeout(waity, 2800)
                            function waity(){
                                $("#killed").hide(400)
                                $("#eimg").hide()
                                Main(player)
                            }
                        }

                    }
            }
            
            
    }

    var Main = (player) =>
    {
        $("#storeDiv").hide()
        $("#shopButton").show()
        $("#mainGameBox").empty()
        $("#mainGameBox").show()
        $("#lvlUpBtn").hide()
        $("#foundEnemy").hide()
        // while(1)
        // {
        GenerateScenario(player)
        // }
        $("#potionBtn").on("click", function(){
            console.log("clicked");
            if(player.potions <= 10){
                if(player.gold >= player.potionGoldNeed){
                    console.log("potionbuy");
                    player.potions += 1;
                    player.gold -= player.potionGoldNeed;
                    $("#goldh3").html("Gold: " + player.gold);
                    player.potionGoldNeed += 10;
                    $("#hpPotionsh3").replaceWith('<span id="hpPotionsh3">Potions: ' + player.potions + '</span>');
                    $("#defBtnTxt").text(player.defGoldNeed + " gold");
                    $("#dmgBtnTxt").text(player.dmgGoldNeed + " gold");
                    $("#accBtnTxt").text(player.accuGoldNeed + " gold");
                    $("#potionBtnTxt").text(player.potionGoldNeed + " gold");
                    
                }
                else{
                    alert("not enough gold!");
                }
            }
            else{
                alert("You have too many potions!");
            }
    
        });

        $("#shopButton").on("click", function(){
            console.log("Open Store");
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
            
        });
        
        
        
        
        function hideShop(){
            setTimeout(closeShop, 1)
            function closeShop(){
                $("#storeDiv").hide();
                $("#shopButton").show();
                $("")
            }
        }
        
    }
    $("#storeDiv").hide()
    $("#shopButton").show()
    $("#hudRow").hide()
    $("#mainGameBox").show()
    $("#lvlUpBtn").hide()
    $("#foundEnemy").hide()

    $("#enterDunBtn").on("click",function(e){
        console.log("CLICKED")
        $.get( "/api/players/1", function( data ) {
            console.log(data)
            const player = data
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
    
            Main(player);
        })
    })
})

