'use strict';
module.exports = (sequelize, DataTypes) => {
  const usuario = sequelize.define('user', {
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
  }, {});
  usuario.associate = function(models) {
    // associations can be defined here
  };
  return usuario;
};