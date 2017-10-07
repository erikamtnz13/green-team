drop database if exists game_db;
create database game_db;

use game_db;

drop table if exists user_info;
drop table if exists player_info;

/*
create table user_info(
	UserID integer(11) auto_increment not null,
    username varchar(31) not null,
    password varchar(16) not null,
     email varchar(41) not null,
     primary key (UserID)
 );

 create table player_info(
 	player_id integer(11) auto_increment not null,
	player_UID integer(11) not null,
     hp integer(11),
     total_hp integer(11),
     attack integer(11),
     damage integer(11),
     defense integer(11),
     xp integer(11),
     lvl integer(11),
     items varchar(600),
     timestamp timestamp,
     primary key (player_id),
     foreign key (player_UID) references user_info (UserID)
 );
 */

 Insert into user_info (username,password,email) values ('coreyro','password','coreyro@email.com');
 insert into player_info (player_UID) values ('1');