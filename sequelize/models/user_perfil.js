'use strict';
module.exports = (sequelize, DataTypes) => {
  const perfil_user = sequelize.define('UserPerfil', {
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
    perfil_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'profile',
        key: 'id'
      }
    }

  }, { freezeTableName: true,  tableName: 'user_perfil'});
  perfil_user.associate = function(models) {
    
  };
  return perfil_user;
};