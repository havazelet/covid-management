"use strict";
const { ObjectId } = require("mongoose");
const mongoose = require("mongoose");
const { ObjectID, Array } = require("mongoose/lib/schema/index");
const customersSchema = mongoose.Schema({
  nameName: {
    type: String,
  },
  password:{
    type: String,
  }
});
module.exports = mongoose.model("User", customersSchema );
