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
      { tableName: 'tenant', schema: config.db.schema },
      [
        {
          firstName: 'mohana',
          lastName: 'M',
          email: 'mohana98m@gmail.com',
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
    return queryInterface.bulkDelete({ tableName: 'tenant', schema: config.db.schema }, null, {});
  },
};
