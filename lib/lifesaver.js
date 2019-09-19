//
// Copyright Platformers (C) 2019
//

const rez = require('./rez');

const lifesaver = () => (err, req, res, next) => {
  //
  // Handle validation errors gracefully
  //
  if (err.name === 'ValidationError') {
    let message = err.message;

    //
    // Get the message of the first validation error (because there can be multiple)
    // or just the error message of the object. Either way, the key here is that we don't throw 500.
    //
    const fields = err.errors;
    const keys = Object.keys(fields);

    if (keys.length) {
      const firstField = fields[keys[0]];
      message = firstField.message;
    }

    rez.error(res, message);
  } else if (err.name === 'UpviseClientError') {
    const msg = 'Upvise Error: ' + err.message;
    console.error(msg, err.stack);
    rez.error(res, msg);
  } else {
    const msg = err.message || err;
    console.error(msg, err.stack ? err.stack : 'No stacktrace available');
    rez.error(res, msg);
  }
};

module.exports = lifesaver;
