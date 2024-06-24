
const Joi = require('joi');

const login = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

const forgetPassword = {
  body: Joi.object().keys({
    email: Joi.string().email().required(),
  }),
};

const logout = {
  body: Joi.object().keys({
    token: Joi.string().required(),
  }),
};

const resetpassword = {
  query: Joi.object({
    resetCode: Joi.string().required(),
  }),
  body: Joi.object({
    newPassword: Joi.string().min(8).required(),
  }),
};

module.exports = {
  login,
  forgetPassword,
  resetpassword,
  logout,
};
