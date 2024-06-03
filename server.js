const express = require("express");
const app = express();
const db = require("./db");
const bodyParser = require("body-parser");
app.use(bodyParser.json()); //req.body
require("dotenv").config();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("api is working");
});

//import router files
const profileRoutes = require("./routes/profileRoutes");
const jobListingRoutes = require("./routes/jobListingRoutes");

//use the routes
app.use("/", profileRoutes);
app.use("/", jobListingRoutes);

//  TODO: will do after exams
//JOB REQUEST API'S
//fetch job requests
app.get("/fetchJobRequests", (req, res) => {
  console.log("job list is fetched");
  res.send("job list is fetched");
});

//  TODO: will do after exams
//accept job requests
app.post("/acceptJobRequests/:id", (req, res) => {
  console.log("job accepted");
  res.send("job accepted");
});

//  TODO: will do after exams
//reject job requests
app.post("/rejectJobRequests/:id", (req, res) => {
  console.log("job rejected");
  res.send("job rejected");
});

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
