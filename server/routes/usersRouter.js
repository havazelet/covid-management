"use strict";

const express = require("express");
const router = express.Router();
const users = require("../models/users");
const mongoose = require("mongoose");

router.get("/", async (req, res) => {
  try {
    const usersList = await users.find().exec();
    console.log(`The users were found: ${usersList}`);
    res.json(usersList);
  } catch (error) {
    console.error(`Error finding users: ${error}`);
    res.status(500).send("Server error: could not retrieve customers");
  }
});

router.get('/login', (req, res) => {
  const { userName, password } = req.query;
  if (!userName || !password) {
    res.status(401).send('Invalid username or password');
  } else {
    users.findOne({ userName, password })
      .then(doc => {
        console.log(doc)
        if (doc) {
          res.status(200).send(doc);
        } else {
          res.status(401).send('Invalid username or password');
        }
      })
      .catch(err => {
        console.error(err.message);
        res.status(500).send('Internal server error');
      });
  }
});

module.exports = router;
