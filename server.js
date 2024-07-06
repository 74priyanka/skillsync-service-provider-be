const express = require("express");
const db = require("./db");
const bodyParser = require("body-parser");

//import router files
const profileRoutes = require("./routes/workers/profileRoutes");
const jobListingRoutes = require("./routes/workers/jobListingRoutes");
const jobRequestsRoutes = require("./routes/workers/jobRequestsRoutes");

const app = express();
app.use(bodyParser.json()); //req.body
require("dotenv").config();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("api is working");
});

//use the routes
app.use("/", profileRoutes);
app.use("/", jobListingRoutes);
app.use("/", jobRequestsRoutes);

//  TODO: will do after exams
//APPOINTMENT APIs
//fetch appointments
app.get("/fetchAppointments", (req, res) => {
  console.log("appointments are fetched");
  res.send("appointments are fetched");
});

//  TODO: will do after exams
//AVAILABILITY APIs
//set availability
app.post("/setAvailability", (req, res) => {
  console.log("availability is set");
  res.send("availability is set");
});

//  TODO: will do after implementation of customer and service panel
//FEEDBACK APIs
//fetch feedbacks
app.get("/fetchFeedbacks", (req, res) => {
  console.log("feedbacks are fetched");
  res.send("feedbacks are fetched");
});

//  TODO: will do after implementation of customer and service panel
//HELP & SUPPORT APIs
//fetch help & support
app.get("/fetchHelpAndSupport", (req, res) => {
  console.log("help & support are fetched");
  res.send("help & support are fetched");
});

app.listen(PORT, () => {
  console.log("server is running on port 3000");
});
