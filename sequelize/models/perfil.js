'use strict';
module.exports = (sequelize, DataTypes) => {
  const perfil = sequelize.define('Profile', {
    id:{
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: DataTypes.STRING,
    label: DataTypes.STRING,

  }, { freezeTableName: true, tableName: 'profile' });
  
  perfil.associate = function(models) {
    perfil.belongsToMany(models.User, {
      as: 'Users',
      through: models.UserPerfil,
      foreignKey: 'id'
    })
  };
  return perfil;
};