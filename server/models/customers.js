"use strict";
const { ObjectId } = require("mongoose");
const mongoose = require("mongoose");
const { ObjectID, Array } = require("mongoose/lib/schema/index");
const customersSchema = mongoose.Schema({
  name: {
    type: String,
  },
  id:{
    type: String,
  },
  address:{
    type: String,
  },
  birthDate:{
    type: Date,
  },
  phoneNumber:{
    type: String,
  },
  mobile:{
    type: String,
  },
  imageUrl: {
    type: String,
  }
});
module.exports = mongoose.model("Customer", customersSchema );
