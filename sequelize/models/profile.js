'use strict';
module.exports = (sequelize, DataTypes) => {
  const profile = sequelize.define('Profile', {
    id:{
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: DataTypes.STRING,
    label: DataTypes.STRING,

  }, { freezeTableName: true, tableName: 'profile' });
  
  profile.associate = function(models) {
    profile.belongsToMany(models.User, {
      as: 'Users',
      through: models.UserProfile,
      foreignKey: 'profile_id'
    })
  };
  return profile;
};