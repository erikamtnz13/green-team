
use game_db;
Insert into userinfos (
name,
password,
email
) values 
('coreyro','password','coreyro@email.com');

insert into players (
name,
hp,
total_hp,
attack,
damage,
defense,
xp,
exp,
lvl,
potions,
gold,
defGoldNeed,
dmgGoldNeed,
accuGoldNeed,
potionGoldNeed,
enemiesKilled,
char_img,
char_idle,
char_attack,
UserInfoId
) values
('Corey',20,20,0,0,6,0,0,1,5,100,15,15,15,10,0,'','/img/cleric/cleric_idle.gif','',1);

SELECT * FROM game_db.userinfos;
SELECT * FROM game_db.players;



