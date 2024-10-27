const express = require("express");
const router = express.Router();
const AcceptByWorker = require("../../models/workers/AcceptByWorker");
const serviceRequests = require("../../models/customers/serviceRequests");

// GET route for fetching accepted requests
router.get("/fetchAllAcceptedServiceRequests/:customerId", async (req, res) => {
  const { customerId } = req.params;

  try {
    //fetch accepted requests
    const acceptedRequests = await AcceptByWorker.find({
      posted_by_customer_id: customerId,
    });

    if (!acceptedRequests.length) {
      return res
        .status(404)
        .json({ message: "No accepted requests found for the customer" });
    }

    return res.status(200).json(acceptedRequests);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Internal Server Error" });
  }
});

//Confirmation by customer
router.put("/confirmByCustomer/:requestId", async (req, res) => {
  const { requestId } = req.params; //extract requestId from URL
  console.log("request id", requestId);

  try {
    const updatedRequest = await serviceRequests.findByIdAndUpdate(
      requestId,
      {
        status: "Confirmed",
      },
      { new: true }
    ); //update status to confirmed

    if (!updatedRequest) {
      return res.status(404).json({ message: "Request not found" });
    }

    // Delete the related document from the AcceptByWorker collection
    await AcceptByWorker.deleteOne({ service_request_id: requestId });

    res.status(200).json({
      message: "Request confirmed successfully",
      updatedRequest,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error occurred while confirming the service request",
      error,
    });
  }
});

module.exports = router;
