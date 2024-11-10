const express = require("express");
const router = express.Router();
const customerProfile = require("../../models/customers/customerProfile");
const JobListing = require("../../models/workers/JobListing");
const acceptByCustomer = require("../../models/customers/acceptByCustomer");

//POST route for a customer to accept a job posting(listing)
router.post("/accept/byCustomer", async (req, res) => {
  const { customerId, jobListingId, action } = req.body;

  try {
    //fetch customer details
    const customer = await customerProfile.findById(customerId);
    if (!customer)
      return res.status(404).json({ message: "Customer not found" });

    //fetch job listing details
    const jobListing = await JobListing.findById(jobListingId);
    if (!jobListing) {
      return res.status(404).json({ message: "Job listing not found" });
    }

    // Check if the job posting is already accepted
    if (jobListing.status === "Accepted" && action === "Accepted") {
      return res.status(400).json({ msg: "Job Posting already accepted" });
    }

    //create a new record in the AcceptByCustomer model
    const newAcceptByCustomer = new acceptByCustomer({
      posted_by_worker_id: jobListing.userId,
      job_posting_category: jobListing.category,
      job_posting_id: jobListingId,
      accepted_by_customer_name: customer.name,
      accepted_by_customer_id: customerId,
      accepted_by_customer_phone_number: customer.contact,
    });

    if (action === "Accepted") {
      await newAcceptByCustomer.save();
    }

    jobListing.status = action || "Accepted";
    await jobListing.save();

    return res
      .status(200)
      .json({ message: "Job Post accepted", newAcceptByCustomer });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
