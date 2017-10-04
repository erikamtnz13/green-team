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

  // Player.associate = function(models){
  //   Player.belongsTo(models.userInfo, {
  //     foreignKey: {
  //       allowNull: false
  //     }
  //   });

    
  // };
    return Player;
  };