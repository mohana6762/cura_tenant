const config = require('../src/config/vars');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      'license',
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        user_id: {
          type: Sequelize.INTEGER,
        },
        name: {
          type: Sequelize.STRING,
        },
        validitiy: {
          type: Sequelize.DATE,
        },
        status: {
            type: Sequelize.ENUM('Active', 'Inactive'),
        },
        isTrash: {
          type: Sequelize.BOOLEAN,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: new Date(),
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
          defaultValue: new Date(),
        },
      },
      {
        schema: config.db.schema,
        freezeTableName: true,
      }
    );
  },
  async down(queryInterface) {
    await queryInterface.dropTable('license');
  },
};
