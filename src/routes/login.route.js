const express = require('express');
const { adminLogin, forgotPassword, logout, adminRefreshToken, resetPassword } = require('../controllers/login.controller');
const validate = require('../middleware/validate');
const loginValidation = require('../validation/login.validation');
const adminAuth = require('../middleware/adminAuth');

const router = express.Router();

router.post('/', validate(loginValidation.login), adminLogin);
router.post('/forgotpassword', validate(loginValidation.forgetPassword), forgotPassword);
router.post('/resetpassword', validate(loginValidation.resetpassword), resetPassword);
router.post('/refreshtoken', validate(loginValidation.logout), adminRefreshToken);
router.post('/logout', adminAuth, validate(loginValidation.logout), logout);

module.exports = router;
