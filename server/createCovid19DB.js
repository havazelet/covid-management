const mongoose = require('mongoose');
const User = require("./models/users");
const Customer = require("./models/customers");
const Corona = require("./models/corona");

mongoose.connect("mongodb://127.0.0.1:27017/covid19", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const newUser = new User({
    name: 'שלום שלום',
    userName: 'username',
    password: 'password',
});

const newCustomer = new Customer({
    name: "יוגב כהן",
    id: "100000009",
    address: "מכביה 3, אילת",
    birthDate: "01/01/1999",
    phoneNumber: "087747877",
    mobile: "0874787478"
});

const newCorona = new Corona({
    id: "100000009",
    vaccinationDate: ["01/01/2020"],
    vaccinationMaker: "Pfizer",
    sicknessPeriod: { getSickness: "05/01/2023", recoveryDate: "05/15/2023" }
});

Promise.all([
    User.findOne({ userName: 'username' }), 
    Corona.findOne({ id: '100000009' }),
    Customer.findOne({ id: '100000009' })])
    .then(user => {
        if (user.some((item) => item)) {
            console.log('Username already exists in collection');
            mongoose.disconnect();
            return;
        }
        Promise.all([
            newUser.save(),
            newCustomer.save(),
            newCorona.save()
        ]).then(results => {
            console.log('All records saved to database:', results);
            mongoose.disconnect();
        }).catch(err => {
            console.error(err);
            mongoose.disconnect();
        });
        
    })
    .catch(err => {
        console.error(err);
        mongoose.disconnect();
});


