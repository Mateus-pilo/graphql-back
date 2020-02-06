'use strict';
module.exports = (sequelize, DataTypes) => {
  const profile_user = sequelize.define('UserProfile', {
    id:{
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    },
    profile_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'profile',
        key: 'id'
      }
    }

  }, { freezeTableName: true,  tableName: 'user_profile'});
  profile_user.associate = function(models) {
    
  };
  return profile_user;
};