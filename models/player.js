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
