const { Sequelize, Op } = require('sequelize');
const db = require('../../models/index');
const { sequelize } = require('../../models/index');
const logger = require('../config/logger');

const loginService = {};


loginService.updateUserPassword = async (userId, newPassword) => {
  return db.adminUser.update(
    {
      password: newPassword,
    },
    {
      where: {
        id: userId,
      },
    }
  );
};

loginService.checkUser = async (email) => {
  const existingCode = await db?.adminUser?.findOne({
    where: {
      email,
      isActive: true,
      isTrash: false,
    },
  });
  return existingCode;
};

loginService.adminTokenExist = async (token) => {
  const data = await db.adminRefreshToken.findOne({
    where: {
      token,
    },
  });
  return data;
};

loginService.findRefreshTokensByAdminUserId = async (userId) => {
  return db.adminRefreshToken.findAll({
    where: {
      user_id: userId,
    },
  });
};

loginService.deleteAdminRefreshToken = async (token) => {
  try {
    const deletedRows = await db.adminRefreshToken.destroy({
      where: {
        token,
      },
    });

    return deletedRows;
  } catch (err) {
    throw new Error(err.message);
  }
};

loginService.AdminTokenExist = async (token) => {
  const data = await db.adminRefreshToken.findOne({
    where: {
      token,
    },
  });
  return data;
};

loginService.findAdminUserByEmailAndId = async (email, userId) => {
  return db.adminUser.findOne({
    where: {
      email,
      id: userId,
    },
  });
};

loginService.adminRefreshToken = async ({ userId, token, expiresAt }) => {
  return db.adminRefreshToken.create({
    user_id: userId,
    token,
    expiresAt,
  });
};

loginService.deleteExpiredRefreshTokens = async () => {
  const expiredTokens = await db.adminRefreshToken.findAll({
    where: {
      expiresAt: { [Sequelize.Op.lt]: new Date().setDate(new Date().getDate() - 2) },
    },
  });
  await Promise.all(expiredTokens.map((token) => token.destroy()));
  logger.info('Deleting Expired Refresh Token');
};

loginService.deleteExpiredUserCoupon = async () => {
  const expiredTokens = await db.userDiscount.findAll({
    where: {
      validity: { [Sequelize.Op.lt]: new Date().setDate(new Date().getDate() - 5) },
    },
  });
  await Promise.all(expiredTokens.map((token) => token.destroy()));
  logger.info('Deleting Expired Refresh Token');
};

module.exports = loginService;
