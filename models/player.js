module.exports = function(sequelize, DataTypes) {
	var Player = sequelize.define("Player", {
	  // player_UID: {
		// type: DataTypes.INTEGER,
		// allowNull: true,
    //   },
	  name: {
		type: DataTypes.STRING,
		allowNull: true,
		validate: {
		  len: [1, 140]
		}
	  },
	  hp: {
		type: DataTypes.INTEGER,
		defaultValue: 10
      },
      total_hp: {
          type: DataTypes.INTEGER,
          defaultValue: 10
      },
      attack: {
          type: DataTypes.INTEGER,
          defaultValue: 10
      },
      damage: {
        type: DataTypes.INTEGER,
        defaultValue: 10
      },
      defense: {
        type: DataTypes.INTEGER,
        defaultValue: 10
      },
      xp: {
        type: DataTypes.INTEGER,
        defaultValue: 10
      },
      exp: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      exp: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      lvl: {
        type: DataTypes.INTEGER,
        defaultValue: 10
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
      },
      char_spell: {
        type: DataTypes.STRING,
        allowNull: true
      }
    },
  {
    timestamps: true
  }
// );
  // Player.associate = function(models){
  //   Player.belongsTo(models.UserInfo, {
  //     foreignKey: {
  //       //name: 'UserInfoId',
  //       allowNull: false
  //     }
  //   });

    
  // };

  , {
    classMethods: {
      associate: function(models) {
        Player.hasMany(models.UserInfo, {foreignKey: 'UserInfoId'});
      }
    }
  });
    return Player;
  };
