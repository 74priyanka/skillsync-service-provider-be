const express = require("express");
const db = require("./db");
const bodyParser = require("body-parser");
const cors = require("cors");

//import workers router files
const profileRoutes = require("./routes/workers/profileRoutes");
const jobListingRoutes = require("./routes/workers/jobListingRoutes");
const jobRequestsRoutes = require("./routes/workers/jobRequestsRoutes");

//import customers router files
const customersProfileRoutes = require("./routes/customers/customersProfileRoutes");
const serviceRequestsRoutes = require("./routes/customers/serviceRequestsRoutes");

const app = express();
app.use(
  cors({
    origin: "http://localhost:3001/", // Replace with your frontend domain
  })
);
app.use(bodyParser.json()); //req.body
require("dotenv").config();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("api is working");
});

//use the workers routes
app.use("/workers", profileRoutes);
app.use("/workers", jobListingRoutes);
app.use("/workers", jobRequestsRoutes);

//use the customers routes
app.use("/customers", customersProfileRoutes);
app.use("/customers", serviceRequestsRoutes);

app.listen(PORT, () => {
  console.log("server is running on port 3000");
});
