
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
UserInfoId
) values
('Corey',50,50,0,100,6,50,50,1,5,100,15,15,15,10,0,1);

SELECT * FROM game_db.userinfos;
SELECT * FROM game_db.players;



