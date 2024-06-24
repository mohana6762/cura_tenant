const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

// Custom Requires
const { sequelize } = require('../model');

const config = require('./config/vars');
const routes = require('./routes');
const response = require('./utility/response');
const rescodes = require('./utility/rescodes');


// app express
const app = express();

// cors Options
const corsOptions = {
  origin: '*',
};
app.use(cors(corsOptions));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// API V1 Action Routs
app.use('/api/v1', routes);

// home handler
app.use('/', (req, res) => {
  // res.response = { code: 404, message: rescodes.notFound };
  // next();
  res.status(200).render('comingsoon');
});

// 404 handler
routes.use((req, res, next) => {
  res.response = { code: 404, data: { message: rescodes.notFound } };
  next();
}, response.default);

// create schema
const createSchema = async function () {
  await sequelize.showAllSchemas({ logging: false }).then(async (data) => {
    if (!data.includes(config.db.schema)) {
      await sequelize.createSchema(config.db.schema);
    }
  });
};
createSchema();


// connect database
sequelize
  .sync({ logging: false })
  .then(() => {
    console.log('DB Connection Successful');
    app.listen(config.app.port, () => {
      console.log(`Listening to port ${config.app.port}`);
    });
  })
  .catch(() => {
    console.log('DB Connection Error');
  });

module.exports = app;
