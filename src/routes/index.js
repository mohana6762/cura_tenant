const express = require('express');

const routes = express.Router();

const response = require('../utility/response');

routes.use('/login', require('./login.route'), response.default);

module.exports = routes;
