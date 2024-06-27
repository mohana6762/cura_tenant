const nodeEnv = require('custom-env');
const path = require("path")
const {
  APP_PORT,
  APP_ENV,
  APP_HOSTNAME,
  ACCESS_TOKEN_SECRET,
  REFRESH_TOKEN_SECRET,
  APP_ADMIN_EMAIL,
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_NAME,
  DB_SCHEMA,
  DB_DIALECT,
  FRONTEND_URL,
  APP_FRONTEND_URL,
  
} = process.env.APP_SECRET ? JSON.parse(process.env.APP_SECRET) : {};

nodeEnv.env(process.env.NODE_ENV || 'local', './env');

module.exports = {
  app: {
    port: parseInt(APP_PORT || process.env.APP_PORT, 10) || 8090,
    env: APP_ENV || process.env.APP_ENV,
    hostname: APP_HOSTNAME || process.env.APP_HOSTNAME,
    accesstoken: ACCESS_TOKEN_SECRET || process.env.ACCESS_TOKEN_SECRET,
    refreshtoken: REFRESH_TOKEN_SECRET || process.env.REFRESH_TOKEN_SECRET,
    adminEmail: APP_ADMIN_EMAIL || process.env.APP_ADMIN_EMAIL,
    enableCache: parseInt(process.env.ENABLE_CACHE, 10) === 1,
    frontendURL: FRONTEND_URL || process.env.FRONTEND_URL,
    appFrontEndURL: APP_FRONTEND_URL || process.env.APP_FRONTEND_URL,
  },
  db: {
    dialect: DB_DIALECT || process.env.DB_DIALECT,
    host: DB_HOST || process.env.DB_HOST,
    port: parseInt(DB_PORT || process.env.DB_PORT, 10) || 3306,
    username: DB_USER || process.env.DB_USER,
    password: DB_PASSWORD || process.env.DB_PASSWORD,
    database: DB_NAME || process.env.DB_NAME,
    debug: process.env.DB_DEBUG,
    schema: DB_SCHEMA || process.env.DB_SCHEMA,
    poolMax: parseInt(process.env.DB_POOL_MAX, 10) || 5,
    poolMin: parseInt(process.env.DB_POOL_MIN, 10) || 0,
    poolAcquire: parseInt(process.env.DB_POOL_ACQUIRE, 10) || 15000,
    pollIdle: parseInt(process.env.DB_POOLIdLE, 10) || 10000,
  },
};
