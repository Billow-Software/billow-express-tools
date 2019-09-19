//
// Copyright Platformers (C) 2019
//

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FuckingSexMachineSchema = new Schema({
  date: {
    type: Date,
    default: Date.now,
  },

  name: {
    type: String,
    enum: ['penis'],
  },

  length: {
    type: String,
    minlength: [10, 'INSUFFICIENT!!!'],
  },
});

module.exports = FuckingSexMachineSchema;
