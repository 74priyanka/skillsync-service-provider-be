const express = require("express");
const router = express.Router();
const acceptByCustomer = require("../../models/customers/acceptByCustomer");
const JobListing = require("../../models/workers/JobListing");

//GET route for fetching accepted job posts
router.get("/fetchAllAcceptedJobPostings/:workerId", async (req, res) => {
  const { workerId } = req.params;
  try {
    //fetch accepted job posts
    const acceptedJobPosts = await acceptByCustomer.find({
      posted_by_worker_id: workerId,
    });
    if (!acceptedJobPosts.length) {
      return res.status(404).json({ message: "No accepted job posts found" });
    }
    return res.status(200).json(acceptedJobPosts);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

//confirmation by worker

router.put("/confirmByWorker/:jobId", async (req, res) => {
  const { jobId } = req.params; //extract jobId from URL

  try {
    const updatedJob = await JobListing.findByIdAndUpdate(
      jobId,
      {
        status: "Confirmed",
      },
      { new: true }
    ); //update status to confirmed

    if (!updatedJob) {
      return res.status(404).json({ message: "Job not found" });
    }

    res.status(200).json({
      message: "Job confirmed successfully",
      updatedJob,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error occurred while confirming the service Job",
      error,
    });
  }
});

module.exports = router;
