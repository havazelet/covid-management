"use strict";
const mongoose = require("mongoose");
const CoronaSchema = mongoose.Schema({
  id:{
    type: String,
  },
  vaccinationDate:[String],
  vaccinationMaker:{
    type: String,
  },
  sicknessPeriod:{
    getSickness: {
      type: Date
    },
    recoveryDate: {
      type: Date
    }
  }
}, {collection: "corona"});
module.exports = mongoose.model("Corona", CoronaSchema );
