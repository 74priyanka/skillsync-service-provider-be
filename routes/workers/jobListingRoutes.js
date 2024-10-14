const express = require("express");
const router = express.Router();

const JobListing = require("../../models/workers/JobListing");

//JOB LISTING APIs
//create job listing
router.post("/createJobListing", async (req, res) => {
  try {
    const {
      name,
      category,
      service_availability_duration,
      date,
      contact,
      price,
      job_description,
      userId,
      status,
    } = req.body;

    // Basic validation
    if (
      !name ||
      !category ||
      !service_availability_duration ||
      !date ||
      !contact ||
      !price ||
      !job_description ||
      !userId ||
      !status
    ) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Create a new job listing document
    const newJobListing = new JobListing({
      name,
      category,
      service_availability_duration,
      date,
      contact,
      price,
      job_description,
      userId,
      status: status || "Pending", // Set default status if not provided
    });

    // Save the job listing to the database
    const response = await newJobListing.save();
    console.log("Job listing created:", response);
    res.status(201).json(response);
  } catch (err) {
    console.error("Error creating job listing:", err.message); // Improved error logging
    res
      .status(500)
      .json({ error: "Internal server error", details: err.message }); // Include error details in response
  }
});

//get job listing
router.get("/getJobListing", async (req, res) => {
  try {
    //get the jobList from database
    const data = await JobListing.find();
    console.log("job listing is fetched");

    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

//get job listing by particular profileId
router.get("/getJobListingByWorker/:userId", async (req, res) => {
  const { userId } = req.params; //extract userId from URL parameters

  try {
    //find job listings where the userId matches the worker's profileId
    const data = await JobListing.find({ userId });
    if (data.length === 0) {
      return res
        .status(404)
        .json({ error: "No job listings found for this profileId" });
    }
    console.log("Job listings fetched for worker", userId);
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//update job listing
router.put("/updateJobListing/:id", async (req, res) => {
  try {
    const jobListingId = req.params.id;
    const updateJobListingData = req.body;

    //update joblist in the database
    const response = await JobListing.findByIdAndUpdate(
      jobListingId,
      { $set: updateJobListingData },
      {
        new: true, //return updated document
        runValidators: true, //run mongoose validation
      }
    );
    if (!response) {
      return res.status(404).json({ error: "jobListing not found" });
    }
    console.log("job listing is updated");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

//delete job listing
router.delete("/deleteJobListing/:id", async (req, res) => {
  try {
    const jobListingId = req.params.id;
    //delete joblist in the database
    const response = await JobListing.findByIdAndDelete(jobListingId);
    if (!response) {
      return res.status(404).json({ error: "jobListing not found" });
    }
    console.log("job listing is deleted");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

module.exports = router;
