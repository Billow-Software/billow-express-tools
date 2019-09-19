//
// Copyright Platformers (C) 2019
//

const mongoose = require('mongoose');
const { mongooseTools, lifesaver, asyncErrorCatcher } = require('../index');
const controller = require('./controller');
const app = require('express')();

app.get('/401', asyncErrorCatcher(controller.unauthorised));
app.get('/404', asyncErrorCatcher(controller.notFound));
app.get('/500', asyncErrorCatcher(controller.thrown));
app.get('/insert-item', asyncErrorCatcher(controller.insertItem));
app.get('/validation-error', asyncErrorCatcher(controller.validationError));
app.get('/validation-error2', asyncErrorCatcher(controller.validationError2));

app.use(lifesaver());

const start = async () => {
  //
  // Connect to the db cunt
  //
  await mongooseTools.dbConnect('mongodb://localhost:27017/billow-express-tools');

  //
  // Models
  //
  mongooseTools.initModels({
    FuckingSexMachine: require('./schemas/fucking-sex-machine'),
  });

  return new Promise((resolve) => {
    const server = app.listen(2000, () => {
      console.log('The app is going');
      server.on('close', () => {
        console.log('Shutting down...');
        mongoose.disconnect();
      });
      resolve(server);
    });
  });
};

if (require.main === module) {
  start();
} else {
  module.exports = { app, start };
}
