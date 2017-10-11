module.exports = function(sequelize, DataTypes) {
	var player = sequelize.define("player", {
	  player_UID: {
		type: DataTypes.INTEGER,
		allowNull: false,
      },
	  name: {
		type: DataTypes.STRING,
		allowNull: true,
		validate: {
		  len: [1, 140]
		}
	  },
	  hp: {
		type: DataTypes.INTEGER,
		defaultValue: false
      },
      total_hp: {
          type: DataTypes.INTEGER,
          allowNull: false
      },
      attack: {
          type: DataTypes.INTEGER,
          allowNull: false
      },
      damage: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      defense: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      xp: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      exp: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      lvl: {
        type: DataTypes.INTEGER,
        allowNull: false
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
        allowNull: true,
      },
      char_idle: {
        type: DataTypes.STRING,
        allowNull: true
      },
      char_attack: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
  {
    timestamps: true
  });



  player.associate = function(models){
    player.belongsTo(models.UserInfo, {
      foreignKey: {
        allowNull: false
      }
    });

    
  };
    return player;
  };
