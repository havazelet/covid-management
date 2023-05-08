"use strict";
const { ObjectId } = require("mongoose");
const mongoose = require("mongoose");
const { ObjectID, Array } = require("mongoose/lib/schema/index");
const CoronaSchema = mongoose.Schema({
  id:{
    type: String,
  },
  vaccinationDate:[String],
  vaccinationMaker:{
    type: String,
  },
  sicknessPeriod:{
    type: Object
  }
}, {collection: "corona"});
module.exports = mongoose.model("Corona", CoronaSchema );
