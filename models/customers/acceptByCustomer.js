const mongoose = require("mongoose");

//create accept-by-worker schema
const acceptByCustomerSchema = new mongoose.Schema({
  posted_by_worker_id: {
    type: String,
    // required: true,
  },
  job_posting_id: {
    type: String,
    required: true,
  },
  accepted_by_customer_name: {
    type: String,
    // required: true,
  },
  accepted_by_customer_id: {
    type: String,
    required: true,
  },
  accepted_by_customer_phone_number: {
    type: String,
    // required: true,
  },
});

//create a accept-by-worker model
const AcceptByCustomer = mongoose.model(
  "AcceptByCustomer",
  acceptByCustomerSchema
);
module.exports = AcceptByCustomer;
