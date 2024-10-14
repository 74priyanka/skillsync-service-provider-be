const express = require("express");
const router = express.Router();
const acceptByCustomer = require("../../models/customers/acceptByCustomer");

//GET route for fetching accepted job posts
router.get("/fetchAllAcceptedJobPostings/:workerId", async (req, res) => {
  const { workerId } = req.params;
  console.log("worker id : ", workerId);
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

module.exports = router;
