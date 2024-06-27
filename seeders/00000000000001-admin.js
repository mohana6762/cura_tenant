const jwt = require('jsonwebtoken');
const config = require('../src/config/vars');

module.exports = {
  up: (queryInterface) => {
    const encryptedPassword = jwt.sign(
      {
        password: 'smartwork@123',
      },
      config.app.accesstoken
    );
    return queryInterface.bulkInsert(
      { tableName: 'admin', schema: config.db.schema },
      [
        {
          firstName: 'mohana',
          lastName: 'M',
          email: 'mohanasurya98m@gmail.com',
          password: encryptedPassword,
          userName: 'mohana',
          isActive: true,
          isTrash: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete({ tableName: 'admin', schema: config.db.schema }, null, {});
  },
};
