"use strict";
const express = require("express");
const router = express.Router();
const customers = require("../models/customers");
const corona = require("../models/corona");
const  mongoose  = require("mongoose");


router.get("/", async (req, res) => {
  try {
    let customersList = await customers.find().exec();
    customersList = customersList.map(customer => {
      const customerObj = customer.toObject();
      const date = new Date(customer.birthDate);
      customerObj.birthDate = date.toLocaleDateString('en-GB');
      return customerObj;
    });
    res.send(customersList);
  } catch (error) {
    console.error(`Error finding customers: ${error}`);
    res.status(500).send("Server error: could not retrieve customers");
  }
});


router.get('/:id', async (req, res) => {
  try {
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      const customer = await customers.findById(req.params.id).exec();
      if (!customer) {
        console.log(`Customer with ID ${req.params.id} not found`);
        return res.status(404).send('Customer not found');
      }
      console.log(`Retrieved customer with ID ${req.params.id}`);
      res.send(customer);
    } else {
      console.log(`Invalid customer ID: ${req.params.id}`);
      res.status(400).send('Invalid customer ID');
    }
  } catch (error) {
    console.error(`Error retrieving customer with ID ${req.params.id}: ${error}`);
    res.status(500).send(`Server error: could not retrieve customer with ID ${req.params.id}`);
  }
});


router.post("/", async (req, res) => {
  try {
    const existingCustomer = await customers.findOne({ id: req.body.id });
    if (existingCustomer) {
      console.log(`Customer with ID ${req.body.id} already exists`);
      res.status(400).send('Customer already exists');
      return;
    }
    if (Object.values(req.body).every(value => value !== '') && isValidIsraeliID(req.body.id) && isValidIsraeliMobile(req.body.mobile) 
      && isValidIsraeliMobile(req.body.phoneNumber) && req.body.birthDate ){
      const newCustomer = await customers.create(req.body);
      console.log(`Created new customer with ID ${newCustomer.id}`);
      res.status(201).json(newCustomer);
    } else {
      console.log(`Invalid data received: ${JSON.stringify(req.body)}`);
      res.status(400).send('Invalid data received');
    } 
  } catch (error) {
    console.error(`Error creating new customer: ${error}`);
    res.status(500).send("Server error: could not create new customer");
  }
});


const isValidIsraeliID = (id) => {
  var id = String(id).trim();
  if (id.length > 9 || id.length < 5 || isNaN(id)) return false;
  id = id.length < 9 ? ("00000000" + id).slice(-9) : id;
  return Array.from(id, Number).reduce((counter, digit, i) => {
      const step = digit * ((i % 2) + 1);
      return counter + (step > 9 ? step - 9 : step);
  }) % 10 === 0;
}

const isValidIsraeliMobile = (mobile) => {
  const regex = /^(\+972|0)([23489]|5[0248]|77)[1-9]\d{6}$/;
  return regex.test(mobile);
}

router.put("/:id", async (req, res) => {
  try {
    const updatedCustomer = await customers
      .findOneAndUpdate({ id: req.params.id }, req.body, { new: true })
      .exec();
    console.log(`The customer ${updatedCustomer} was updated`);
    res.json(updatedCustomer);
  } catch (error) {
    console.error(`Error updating customer with id ${req.params.id}: ${error}`);
    res
      .status(500)
      .send(`Server error: could not update customer with id ${req.params.id}`);
  }
});


router.get("/customercorona/:id", async (req, res) => {
  try {
    if (req.params.id) {
      const coronaById = await corona.find({ id: req.params.id }).exec();
      const customerById = await customers.find({ id: req.params.id }).exec();
      if (!customerById.length) {
        console.log(`The customer with id ${req.params.id} was not found`);
        return res
          .status(404)
          .send("The customer with the given ID was not found.");
      }
      res.send({...customerById[0].toObject(), ...coronaById[0].toObject()});
    } else {
      console.log(`The provided ID (${req.params.id}) is not valid`);
      res.status(400).send("Invalid customer ID");
    }
  } catch (error) {
    console.error(`Error finding customer by id ${req.params.id}: ${error}`);
    res
      .status(500)
      .send(`Server error: could not retrieve customer with id ${req.params.id}`);
  }
});

module.exports = router;