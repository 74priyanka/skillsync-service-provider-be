const express = require("express");
const router = express.Router();

const serviceRequests = require("../../models/customers/serviceRequests");
//create service requests (post)
router.post("/createServiceRequests", async (req, res) => {
  try {
    const {
      userId,
      name,
      contact,
      service_requested,
      description,
      requestedDate,
      requestedTime,
      address,
      estimatedDuration,
      price,
      status,
    } = req.body; //assuming the request body contains the serviceRequest data

    if (
      !userId ||
      !name ||
      !contact ||
      !service_requested ||
      !description ||
      !requestedDate ||
      !requestedTime ||
      !address ||
      !estimatedDuration ||
      !price ||
      !status
    ) {
      return res
        .status(400)
        .json({ status: "error", message: "All fields are required" });
    }

    //create a new serviceRequest document using the mongoose model
    const newServiceRequests = new serviceRequests({
      userId,
      name,
      contact,
      service_requested,
      description,
      requestedDate,
      requestedTime,
      address,
      estimatedDuration,
      price,
      status: status || "Pending",
    });

    //save the new jobRequest to the database
    const response = await newServiceRequests.save();
    console.log("service request is created");
    res.status(200).json({ status: "success", response });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: "error", error: "internal server error" });
  }
});

//fetch all service requests
router.get("/getServiceRequests", async (req, res) => {
  try {
    const data = await serviceRequests.find();
    res.json({ status: "success", data });
  } catch (error) {
    res.status(400).json({ status: "error", message: error.message });
  }
});

//fetch single service requests by ID
// Fetch a single service request by ID
router.get("/getServiceRequestsByCustomer/:userId", async (req, res) => {
  try {
    const { userId } = req.params; // extract the id from URL parameter

    // Find the service request by ID
    const data = await serviceRequests.find({ userId });

    if (!data) {
      return res
        .status(404)
        .json({ status: "error", message: "Service request not found" });
    }

    res.status(200).json({ status: "success", data: data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
});

//update service Requests
router.put("/updateServiceRequests/:id", async (req, res) => {
  try {
    const serviceRequestId = req.params.id; //extract the id from URL parameter
    const updateServiceRequestsData = req.body; //update data for the serviceRequests of a person

    const response = await serviceRequests.findByIdAndUpdate(
      serviceRequestId,
      updateServiceRequestsData,
      {
        new: true, //return updated document
        runValidators: true, //run mongoose validation
      }
    );
    if (!response) {
      return res.status(404).json({ error: " customer profile not found" });
    }
    console.log("customer profile data is updated");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

//delete profile
router.delete("/deleteServiceRequests/:id", async (req, res) => {
  try {
    const serviceRequestId = req.params.id; //extract the id from URL parameter

    //assuming you have a profile model
    const response = await serviceRequests.findByIdAndDelete(serviceRequestId);
    if (!response) {
      return res.status(404).json({ error: "service request not found" });
    }
    console.log(" service request is deleted");
    res.status(200).json({
      message: " service request deleted successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});
module.exports = router;
