"use strict";
const express = require("express");
const router = express.Router();
const corona = require("../models/corona");
const  mongoose  = require("mongoose");

router.get("/", async (req, res) => {
  try {
    console.log(corona)
    const coronaList = await corona.find().exec();
    console.log(`The corona were found: ${coronaList}`);
    res.json(coronaList);
  } catch (error) {
    console.error(`Error finding corona: ${error}`);
    res.status(500).send("Server error: could not retrieve corona");
  }
});

router.get("/:id", async (req, res) => {
  try {
    if (req.params.id) {
      const coronaById = await corona.find({ id: req.params.id }).exec();
      if (!coronaById.length) {
        console.log(`The corona with id ${req.params.id} was not found`);
        return res
          .status(404)
          .send("The corona with the given ID was not found.");
      }
      res.send(coronaById[0]);
    } else {
      console.log(`The provided ID (${req.params.id}) is not valid`);
      res.status(400).send("Invalid corona ID");
    }
  } catch (error) {
    console.error(`Error finding corona by id ${req.params.id}: ${error}`);
    res
      .status(500)
      .send(`Server error: could not retrieve corona with id ${req.params.id}`);
  }
});

router.post("/", async (req, res) => {
  try {
    const newCorona = await corona.create(req.body);
    console.log(`The corona ${newCorona} was created`);
    res.send(newCorona);
  } catch (error) {
    console.error(`Error creating new corona: ${error}`);
    res.status(500).send("Server error: could not create new corona");
  }
});


module.exports = router;