'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');
const db = require('./models');
const { sequelize, models } = db;

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// create the Express app
const app = express();

// setup morgan which gives us http request logging
app.use(morgan('dev'));

// setup the express app to enable request.body
app.use(express.json());

// api routes setup
const usersRoutes = require('./routes/usersRoutes');
const coursesRoutes = require('./routes/coursesRoutes');
app.use('/api/users', usersRoutes);
app.use('/api/courses', coursesRoutes);

// log status of connection to database
(async () => {
  await sequelize
    .authenticate()
    .then(() => {
        console.log('Connection to database "fsjstd-restapi.db" has been established!');
    })
    .catch(err => {
        console.error('Unable to connect to the database "fsjstd-restapi.db"', err);
    });
})();

// setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!',
  });
});

// send 404 if no other route matched
app.use((req, res, next) => {
    res.status(404).json({
      Message: 'Route Not Found',
    });
  });
  
// global error handler
app.use((err, req, res, next) => {
    if (enableGlobalErrorLogging) {
        console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
    }
    res.status(err.status || 500).json({
        message: err.message,
        error: {err},
    });
});

// set port
app.set('port', process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
