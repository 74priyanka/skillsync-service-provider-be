const mongoose = require("mongoose");

//create accept-by-worker schema
const acceptByWorkerSchema = new mongoose.Schema({
  posted_by_customer_id: {
    type: String,
    // required: true,
  },
  service_request_id: {
    type: String,
    required: true,
  },
  accepted_by_worker_name: {
    type: String,
    // required: true,
  },
  accepted_by_worker_id: {
    type: String,
    required: true,
  },
  accepted_by_worker_phone_number: {
    type: String,
    // required: true,
  },
  accepted_by_worker_skills: {
    type: [String],
    // required: true,
  },
  accepted_by_worker_certifications: {
    type: [String],
    // required: true,
  },
});

//create a accept-by-worker model
const AcceptByWorker = mongoose.model("AcceptByWorker", acceptByWorkerSchema);
module.exports = AcceptByWorker;
