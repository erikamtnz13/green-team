module.exports = function(sequelize, DataTypes) {
	var Player = sequelize.define("Player", {
	  name: {
    type: DataTypes.STRING,
		allowNull: true,
		validate: {
		  len: [1, 140]
		}
	  },
	  hp: {
		type: DataTypes.INTEGER,
		defaultValue: true
      },
      total_hp: {
          type: DataTypes.INTEGER,
          allowNull: true
      },
      attack: {
          type: DataTypes.INTEGER,
          allowNull: true
      },
      damage: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      defense: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      xp: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      exp: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      lvl: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      potions: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      gold: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      defGoldNeed: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      dmgGoldNeed: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      accuGoldNeed: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      potionGoldNeed: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      enemiesKilled: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      char_img: {
        type: DataTypes.STRING,
        defaultValue: "",
        allowNull: true,
      },
      char_idle: {
        type: DataTypes.STRING,
        defaultValue: '/img/warrior/warrior_idle.gif',
        allowNull: true
      },
      char_attack: {
        type: DataTypes.STRING,
        defaultValue: '/img/warrior/warrior_attack.gif',
        allowNull: true
      },
      char_spell: {
        type: DataTypes.STRING,
        defaultValue: '/img/monsterAttack.gif',
        allowNull: true
      }
    },
  {
    timestamps: true
  });



  Player.associate = function(models){
    Player.belongsTo(models.UserInfo, {
      foreignKey: {
        allowNull: false
      }
    });

    
  };
    return Player;
  };