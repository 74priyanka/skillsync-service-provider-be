const mongoose = require("mongoose");

//create a job listing schema
const jobListingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  service_availability_duration: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },

  price: {
    type: Number,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  job_description: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "Pending",
  },
});

//create a joblist model
const JobListing = mongoose.model("JobListing", jobListingSchema);
module.exports = JobListing;
