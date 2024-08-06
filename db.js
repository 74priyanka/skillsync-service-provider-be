const mongoose = require("mongoose");
require("dotenv").config();

//define mongodb connection URL
// const mongodbURL = process.env.MONGODB_LOCAL_URL;
const mongodbURL = process.env.MONGODB_URL;

//set up mongodb connection
mongoose.connect(mongodbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//get the default connection
//mongoose maintains a default connection object representing the mongodb connection.
const db = mongoose.connection;

//define event listeners for database connection
db.on("connected", () => {
  console.log("connected to mongodb server");
});

db.on("error", (err) => {
  console.log("error connecting to mongodb server", err);
});

db.on("disconnected", () => {
  console.log("disconnected from mongodb server");
});

//export the database connection
module.exports = db;
