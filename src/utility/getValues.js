/* eslint-disable no-unsafe-optional-chaining */
const getValues = {};
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const db = require('../../model/index');
const config = require('../config/vars');


getValues.generateAccessToken = async (user) => {
  return jwt.sign(user, config.app.accesstoken, { expiresIn: '60m' });
};

getValues.generatePassword = async (email) => {
  const hashedEmail = crypto.createHash('sha256').update(email).digest('hex');
  const password = hashedEmail.slice(0, 12);
  return password;
};

module.exports = getValues;
