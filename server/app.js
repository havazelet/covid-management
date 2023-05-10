const express = require("express");
const mongoose = require("mongoose");
const morgan = require('morgan');
const cors = require('cors');

// Initialize the Express app and set the port number
const app = express();
const port = 3001;

// Use CORS and Morgan middleware
app.use(cors());
app.use(morgan("dev"));

// Use the JSON middleware to parse incoming requests with JSON payloads
app.use(express.json());


// Set headers for CORS requests
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header("Access-Control-Allow-Headers", "x-access-token, Origin, X-Requested-With, Content-Type, Accept");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, POST, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});


// Import and use routers
const customersRouter = require("./routes/customersRouter");
app.use("/api/customers", customersRouter);
const usersRouter = require("./routes/usersRouter");
app.use("/api/users", usersRouter);
const coronaRouter = require("./routes/coronaRouter");
app.use("/api/corona", coronaRouter);


// Connect to the MongoDB database
mongoose.connect("mongodb://127.0.0.1:27017/covid19", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to DB covid19!");
}).catch((err) => {
  console.error(err);
});


// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});