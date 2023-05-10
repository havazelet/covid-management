"use strict";
const mongoose = require("mongoose");
const customersSchema = mongoose.Schema({
  name: {
    type: String, required: true
  },
  id:{
    type: String, required: true, unique: true 
  },
  address:{
    type: String,
  },
  birthDate:{
    type: Date, required: true
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
