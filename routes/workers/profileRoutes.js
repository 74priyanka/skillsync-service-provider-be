const express = require("express");
const router = express.Router();
const Profile = require("../../models/workers/Profile");
const { jwtAuthMiddleware, generateToken } = require("../../jwt");

//PROFILE API'S
//create profile api
router.post("/register", async (req, res) => {
  try {
    const data = req.body; //assuming the request body contains the profile data

    //create a new profile document using the mongoose model
    const newProfile = new Profile(data);

    //save the new profile to the database
    const response = await newProfile.save();
    console.log("profile data is saved");

    //payload
    const payload = {
      id: response.id,
      userName: response.userName,
    };

    console.log(JSON.stringify(payload));
    //generate a token using the payload
    const token = generateToken(payload);
    console.log("token is:", token);

    res.status(200).json({ response: response, token: token });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

//SIGNUP api

router.post("/signup", async (req, res) => {
  try {
    const { userName, email, password } = req.body;

    // Validate the input
    if (!userName || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }

    // Check if the username or email already exists
    const existingProfile = await Profile.findOne({
      $or: [{ userName }, { email }],
    });
    if (existingProfile) {
      return res.status(400).json({ error: "Username or email already taken" });
    }

    // Create a new profile document
    const newProfile = new Profile({ userName, email, password });

    // Save the new profile to the database
    const response = await newProfile.save();
    console.log("Profile data is saved");

    // Payload for token generation
    const payload = {
      id: response.id,
      userName: response.userName,
    };

    // Generate a token using the payload
    const token = generateToken(payload);
    console.log("Token is:", token);

    res.status(201).json({ response: response, token: token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//LOGIN ROUTE
router.post("/login", async (req, res) => {
  try {
    //extract email and password from request body
    const { email, password } = req.body;

    //find user by email
    const profile = await Profile.findOne({ email: email });
    if (!profile) {
      return res.status(401).json({ message: "User not found" });
    }

    //if user does not exist or password does not match , return error
    if (!profile || !(await profile.comparePassword(password))) {
      return res.status(401).json({ error: "invalid email or password" });
    }
    //payload
    const payload = {
      id: profile.id,
      email: profile.email,
    };

    //generate a token using the payload
    const token = generateToken(payload);
    console.log("token is:", token);
    res.status(200).json({ token: token, profileId: profile.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "internal server error" });
  }
});

//LOGOUT ROUTE
router.post("/logout", async (req, res) => {
  try {
    res.status(200).json({ message: "Successfully logged out" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

//PROFILE ROUTE (getting profile of a user using token )
router.get("/profile", jwtAuthMiddleware, async (req, res) => {
  try {
    const userData = req.user;
    console.log("user data : ", userData);

    const userId = userData.id;
    const user = await Profile.findById(userId);

    res.status(200).json({ user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/profile/:id", async (req, res) => {
  try {
    const profileId = req.params.id; // Extract the ID from the request URL
    const profile = await Profile.findById(profileId); // Find profile by ID

    if (!profile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.json(profile); // Return the profile data
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

//get profile
router.get("/getProfile", async (req, res) => {
  try {
    //get the profile from database
    const data = await Profile.find();
    console.log("profile data is fetched");
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

//update profile
router.put("/updateProfile/:id", async (req, res) => {
  try {
    const profileId = req.params.id; //extract the id from URL parameter
    const updateProfileData = req.body; //update data for the profile of a person

    const response = await Profile.findByIdAndUpdate(
      profileId,
      updateProfileData,
      {
        new: true, //return updated document
        runValidators: true, //run mongoose validation
      }
    );
    if (!response) {
      return res.status(404).json({ error: "profile not found" });
    }
    console.log("profile data is updated");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

//delete profile
router.delete("/deleteProfile/:id", async (req, res) => {
  try {
    const profileId = req.params.id; //extract the id from URL parameter

    //assuming you have a profile model
    const response = await Profile.findByIdAndDelete(profileId);
    if (!response) {
      return res.status(404).json({ error: "profile not found" });
    }
    console.log("profile data is deleted");
    res.status(200).json({
      message: "profile deleted successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "internal server error" });
  }
});

module.exports = router;
