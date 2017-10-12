module.exports = function(sequelize, DataTypes) {
  var UserInfo = sequelize.define("UserInfo", {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false
    
    // email: {
    //   type: DataTypes.STRING,
    //   allowNull: false
    // }
  // });
//   UserInfo.associate = function(models){
//     UserInfo.hasMany(models.Player,{
//         onDelete: "cascade"
//     });
// };
    }
  },
{
  classMethods: {
    associate: function(models) {
      UserInfo.hasMany(models.Player, {
        foreignKey: 'UserInfoId'
        ,
        onDelete: 'CASCADE'
      });
    }
  }
}
  );
  return UserInfo;
};