const { Model } = require('sequelize');
const config = require('../src/config/vars');

module.exports = (sequelize, DataTypes) => {
  class admin extends Model {}
  admin.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      userName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      token: DataTypes.STRING,
      isActive: DataTypes.BOOLEAN,
      isTrash: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'admin',
      schema: config.db.schema,
      freezeTableName: true,
    }
  );
  
  return admin;
};
