const express = require("express");
const router = express.Router();
const Profile = require("../../models/workers/Profile");
const serviceRequests = require("../../models/customers/serviceRequests");
const AcceptByWorker = require("../../models/workers/AcceptByWorker");

// POST route for a worker accepting a service request
router.post("/accept/byWorker", async (req, res) => {
  const { workerId, serviceRequestId } = req.body;
  console.log("Request Body:", req.body);

  try {
    // Fetch worker details
    const workerProfile = await Profile.findById(workerId);
    console.log("Worker Profile:", workerProfile);
    if (!workerProfile) {
      return res.status(404).json({ msg: "Worker not found" });
    }

    // Fetch service request details
    const serviceRequest = await serviceRequests.findById(serviceRequestId);
    if (!serviceRequest) {
      return res.status(404).json({ msg: "Service request not found" });
    }

    // Check if the service request is already accepted
    if (serviceRequest.status === "Accepted") {
      return res.status(400).json({ msg: "Service request already accepted" });
    }

    // Create a new record in the AcceptByWorker model
    const acceptByWorker = new AcceptByWorker({
      posted_by_customer_id: serviceRequest.userId, // customer ID
      service_request_id: serviceRequestId, // service request ID
      accepted_by_worker_name: workerProfile.userName, // fetch worker name from job listing
      accepted_by_worker_id: workerId, // worker ID
      accepted_by_worker_phone_number: workerProfile.contact, // fetch worker contact from job listing
      accepted_by_worker_skills: workerProfile.skills, // worker skills
      accepted_by_worker_certifications: workerProfile.certifications, // worker certifications
    });

    // Save the accept record to the database
    await acceptByWorker.save();

    // Update service request status to 'Accepted'
    serviceRequest.status = "Accepted";
    await serviceRequest.save();

    return res
      .status(200)
      .json({ message: "Service request accepted", acceptByWorker });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
});

module.exports = router;
