const { Model } = require('sequelize');
const config = require('../src/config/vars');

module.exports = (sequelize, DataTypes) => {
  class adminUser extends Model {}
  admin.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      userName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
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
  admin.associate = function (models) {
    admin.hasMany(models.adminRefreshToken, { foreignKey: 'user_id', as: 'userRefreshToken' });
  };
  return admin;
};
