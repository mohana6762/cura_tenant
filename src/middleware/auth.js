
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const config = require('../config/vars');
const db = require('../../models/index');

async function authenticateToken(req, res, next) {
  try {
    const authHeader = req?.headers?.authorization;
    const token = authHeader && authHeader?.split(' ')[1];
    await jwt?.verify(token, config?.app?.accesstoken, async (err, user) => {
      if (err) {
        return res?.sendStatus(401);
      }
      const users = await db?.adminUser?.findOne({
        where: {
          email: user?.name,
          id: user?.id,
          isActive: {
            [Op.ne]: false,
          },
          isTrash: false,
        },
      });
      if (token == null || !users) return res?.sendStatus(401);
      const usersData = { ...users?.dataValues };
      req.user = usersData;
      next();
    });
  } catch (error) {
    return res?.sendStatus(500);
  }
}

module.exports = authenticateToken;
