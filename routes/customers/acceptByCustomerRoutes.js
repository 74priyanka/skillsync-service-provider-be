const express = require("express");
const router = express.Router();
const customerProfile = require("../../models/customers/customerProfile");
const JobListing = require("../../models/workers/JobListing");
const acceptByCustomer = require("../../models/customers/acceptByCustomer");

//POST route for a customer to accept a job posting(listing)
router.post("/accept/byCustomer", async (req, res) => {
  const { customerId, jobListingId } = req.body;
  console.log("Request Body:", req.body);

  try {
    //fetch customer details
    const customer = await customerProfile.findById(customerId);
    console.log("customer profile ", customer);
    if (!customer)
      return res.status(404).json({ message: "Customer not found" });

    //fetch job listing details
    const jobListing = await JobListing.findById(jobListingId);
    console.log("job listing ", jobListing);
    if (!jobListing) {
      return res.status(404).json({ message: "Job listing not found" });
    }

    //create a new record in the AcceptByCustomer model
    const newAcceptByCustomer = new acceptByCustomer({
      posted_by_worker_id: jobListing.userId,
      job_posting_id: jobListingId,
      accepted_by_customer_name: customer.userName,
      accepted_by_customer_id: customerId,
      accepted_by_customer_phone_number: customer.contact,
    });
    await newAcceptByCustomer.save();

    (jobListing.status = "Accepted"), await jobListing.save();

    return res
      .status(200)
      .json({ message: "Job Post accepted", newAcceptByCustomer });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
