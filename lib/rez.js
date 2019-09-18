//
// Copyright Platformers (C) 2019
//

const rez = {
  result: (res, obj) => {
    res.json({
      result: {
        ...{ success: true },
        ...obj,
      },
    });
  },

  error: (res, obj) => {
    res.status(500);
    return res.json({
      error: {
        success: false,
        message: obj,
      },
    });
  },

  errNoAccess: (res) => rez.error(res, 'You do not have permission to access this resource.'),
  errNotFound: (res, item) => rez.error(res, `${item} not found.`),
};

module.exports = rez;
