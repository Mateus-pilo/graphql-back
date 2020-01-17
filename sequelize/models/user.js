'use strict';
module.exports = (sequelize, DataTypes) => {
  const usuario = sequelize.define('User', {
    id:{
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    status: DataTypes.INTEGER,
  }, { freezeTableName: true, tableName: 'user' });
  
  usuario.associate = function(models) {
    usuario.belongsToMany(models.Profile,{ 
      as: 'Perfis',
      through: models.UserPerfil,
      foreignKey:'id'
    });
  };
  return usuario;
};