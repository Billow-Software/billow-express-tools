//
// Copyright Platformers (C) 2019
//

const asyncErrorCatcher = (fn) => {
  if (!(fn instanceof Function)) {
    throw new Error('Must supply a function');
  }

  return (req, res, next, ...otherArgs) => {
    const promise = fn(req, res, next, ...otherArgs);
    if (!promise || !promise.catch) return;
    promise.catch((err) => next(err));
  };
};

module.exports = asyncErrorCatcher;
