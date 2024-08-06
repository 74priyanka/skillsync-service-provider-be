const mongoose = require("mongoose");

//create a service request schema
const serviceRequestsSchema = new mongoose.Schema({
  serviceRequestId: {
    type: String,
    required: true,
    unique: true,
  },

  customerId: {
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

  status: {
    type: String,
    required: true,
    default: "Pending",
  },
});
//create a serviceRequest model
const serviceRequests = mongoose.model(
  "serviceRequests",
  serviceRequestsSchema
);
module.exports = serviceRequests;
