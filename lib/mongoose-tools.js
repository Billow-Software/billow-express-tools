//
// Copyright Platformers (C) 2019
//

const mongoose = require('mongoose');
const _ = require('underscore');

const mongooseTools = {
  initModels(models) {
    _.each(models, (schema, name) => mongoose.model(name, schema));
    console.log(`Successfully initialised ${Object.keys(models).length} models`);
  },

  async dbConnect(url, events = {}, connectionOptions = {}) {
    console.log('Connecting to MongoDB: ' + url);

    mongoose.connection.on(
      'connected',
      events.connected || (() => console.log('MongoDB connection established'))
    );

    mongoose.connection.on(
      'reconnected',
      events.reconnected || (() => console.log('MongoDB connection reestablished'))
    );

    mongoose.connection.on(
      'disconnected',
      events.disconnected || (() => console.log('MongoDB connection disconnected'))
    );

    mongoose.connection.on(
      'close',
      events.close || (() => console.log('MongoDB connection closed'))
    );

    mongoose.connection.on(
      'error',
      events.error || ((error) => console.log('MongooDB Error: ' + error))
    );

    return new Promise((resolve, reject) => {
      mongoose.connect(
        url,
        {
          useNewUrlParser: true,
          reconnectTries: 1000000,
          reconnectInterval: 3000,
          ...connectionOptions,
        },
        (err) => {
          if (err) {
            console.error('Error when connecting to MongoDB', err);
            return reject(err);
          }
          console.log('Connected to MongoDB successfully');
          resolve();
        }
      );
    });
  },
};

module.exports = mongooseTools;
