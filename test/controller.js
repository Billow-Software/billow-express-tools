//
// Copyright Platformers (C) 2019
//

const mongoose = require('mongoose');
const { rez } = require('../index');

const controller = {
  async unauthorised(req, res) {
    return rez.errNoAccess(res);
  },

  async notFound(req, res) {
    return rez.errNotFound(res, 'Clitoris');
  },

  async thrown(req, res) {
    throw new Error('fuck off');
  },

  async insertItem(req, res) {
    const FuckingSexMachine = mongoose.model('FuckingSexMachine');
    const mach = new FuckingSexMachine({});
    await mach.save();
    return rez.result(res, { mach });
  },

  async validationError(req, res) {
    const FuckingSexMachine = mongoose.model('FuckingSexMachine');
    const mach = new FuckingSexMachine({ name: 'dick' });
    await mach.save();
    return rez.result(res, { mach });
  },

  async validationError2(req, res) {
    const FuckingSexMachine = mongoose.model('FuckingSexMachine');
    const mach = new FuckingSexMachine({ length: 2 });
    await mach.save();
    return rez.result(res, { mach });
  },
};

module.exports = controller;
