const express = require("express");
const router = express.Router();
const AcceptByWorker = require("../../models/workers/AcceptByWorker");

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

module.exports = router;
