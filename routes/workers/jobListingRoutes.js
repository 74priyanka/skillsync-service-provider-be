const express = require("express");
const router = express.Router();

const JobListing = require("../../models/workers/JobListing");

//JOB LISTING APIs
//create job listing
router.post("/createJobListing", async (req, res) => {
  try {
    const data = req.body; //assuming the request body contains the joblist data

    //create a new jobList document using the mongoose model
    const newJobListing = new JobListing(data);

    //save the new jobList to the database
    const response = await newJobListing.save();
    console.log("job listing is created");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
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

//update job listing
router.put("/updateJobListing/:id", async (req, res) => {
  try {
    const jobListingId = req.params.id;
    const updateJobListingData = req.body;

    //update joblist in the database
    const response = await JobListing.findByIdAndUpdate(
      jobListingId,
      updateJobListingData,
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
