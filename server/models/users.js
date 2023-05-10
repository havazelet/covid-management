"use strict";
const mongoose = require("mongoose");
const usersSchema = mongoose.Schema({
  userName: {
    type: String, required: true, unique: true  
  },
  password:{
    type: String, required: true 
  },
  name: {
    type: String, required: true 
  },
});
module.exports = mongoose.model("User", usersSchema );
