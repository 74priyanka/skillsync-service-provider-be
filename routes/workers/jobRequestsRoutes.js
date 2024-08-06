const express = require("express");
const router = express.Router();

const JobRequests = require("../../models/workers/JobRequests");

//JOB REQUESTS APIS

//create job requests (post)
router.post("/createJobRequests", async (req, res) => {
  try {
    const data = req.body; //assuming the request body contains the jobRequest data

    //create a new jobRequest document using the mongoose model
    const newJobRequests = new JobRequests(data);

    //save the new jobRequest to the database
    const response = await newJobRequests.save();
    console.log("job request is created");
    res.status(200).json({ status: "success", response });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", error: "internal server error" });
  }
});

//accept job requests
router.post("/serviceRequests/:id/accept", async (req, res) => {
  try {
    const response = await JobRequests.findOneAndUpdate(
      { jobRequestId: req.params.id },
      { status: "Booked", acceptedBy: req.body.acceptedBy },
      { new: true }
    );
    if (!response) {
      return res
        .status(404)
        .json({ status: "error", message: "Job request not found" });
    }
    res.json({ status: "success", message: "Job request accepted", response });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
});

//reject job requests
router.post("/serviceRequests/:id/reject", async (req, res) => {
  try {
    const response = await JobRequests.findOneAndUpdate(
      { jobRequestId: req.params.id },
      { status: "Rejected", rejectedBy: req.body.rejectedBy },
      { new: true }
    );
    if (!response) {
      return res
        .status(404)
        .json({ status: "error", message: "Job request not found" });
    }
    res.json({ status: "success", message: "Job request rejected", response });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
});

//fetch job requests
router.get("/fetchJobRequests", async (req, res) => {
  try {
    const data = await JobRequests.find();
    res.json({ status: "success", data });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
});

//fetch single job requests by ID
router.get("/fetchJobRequests/:id", async (req, res) => {
  try {
    const jobRequestId = req.params.id;
    const data = await JobRequests.findById(jobRequestId);
    if (!data) {
      return res
        .status(404)
        .json({ status: "error", message: "job request not found" });
    }
    res.status(200).json({ status: "success", data: data });
  } catch (error) {
    res.status(500).json({ status: "error", message: error.message });
  }
});

module.exports = router;
