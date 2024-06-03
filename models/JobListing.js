const mongoose = require("mongoose");

//create a job listing schema
const jobListingSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  service_type: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  service_provide_area: {
    type: String,
    required: true,
  },
  availability: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

//create a joblist model
const JobListing = mongoose.model("JobListing", jobListingSchema);
module.exports = JobListing;
