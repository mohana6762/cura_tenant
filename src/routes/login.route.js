const express = require('express');
const { adminLogin, forgotPassword, logout, resetPassword } = require('../controllers/login.controller');
const validate = require('../middleware/validate');
const loginValidation = require('../validation/login.validation');
const adminAuth = require('../middleware/auth');

const router = express.Router();

router.post('/', validate(loginValidation.login), adminLogin);
router.post('/forgotpassword', validate(loginValidation.forgetPassword), forgotPassword);
router.post('/resetpassword',adminAuth, validate(loginValidation.resetpassword), resetPassword);
router.post('/logout', adminAuth, validate(loginValidation.logout), logout);

module.exports = router;
