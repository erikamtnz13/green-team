module.exports = function(sequelize, DataTypes) {

    var Player = sequelize.define("Player", {
      //I believe the IDs will be created automatically using sequelize
      // player_UID: {
      //   type: DataTypes.INTEGER,
      //   allowNull: false
        
      // },
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      hp: {
        type: DataTypes.INTEGER,
        allowNull: false
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

