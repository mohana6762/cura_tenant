const { Model } = require('sequelize');
const config = require('../src/config/vars');

module.exports = (sequelize, DataTypes) => {
  class license extends Model {}
  license.init(
    {
      user_id: DataTypes.INTEGER,
      category: DataTypes.STRING,
      issueTitle: DataTypes.STRING,
      description: DataTypes.STRING,
      status: DataTypes.ENUM("Open", "Closed", "In Progress"),
      isTrash: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'license',
      schema: config.db.schema,
      freezeTableName: true,
    }
  );
  
  return license;
};
