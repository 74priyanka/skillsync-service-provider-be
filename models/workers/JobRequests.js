const mongoose = require("mongoose");

//create a job request schema
const jobRequestsSchema = new mongoose.Schema({
  jobRequestId: {
    type: String,
    required: true,
    unique: true,
  },

  customer: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    contact: {
      type: String,
      required: true,
    },
  },

  serviceDetails: {
    service_requested: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    requestedDate: {
      type: Date,
      required: true,
    },
    requestedTime: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    estimatedDuration: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },

  status: {
    type: String,
    required: true,
    default: "Pending",
  },
  acceptedBy: {
    providerId: { type: String },
    name: { type: String },
    contact: { type: String },
  },
  rejectedBy: {
    providerId: { type: String },
    name: { type: String },
    reason: { type: String },
  },
});
//create a jobrequest model
const JobRequests = mongoose.model("JobRequests", jobRequestsSchema);
module.exports = JobRequests;
