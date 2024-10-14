const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

//define the worker profile schema
const profileSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
  },

  userName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  profile_pic: {
    type: String,
  },
  bio: {
    type: String,
  },
  contact: {
    type: String,
    // required: true,
  },

  nationality: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["female", "male", "other"],
  },
  languages: {
    type: [String],
  },
  address: {
    type: String,
  },

  state: {
    type: String,
    // required: true,
  },
  country: {
    type: String,
    // required: true,
  },
  pincode: {
    type: Number,
    // required: true,
  },
  education: {
    type: String,
  },

  skills: {
    type: [String],
    enum: ["pipe installation", "faucet repair", "plumbing"],
    // required: true,
  },
  certifications: {
    type: [String],
    enum: ["Certified Electrician", "Licensed Plumber"],
    // required: true,
  },

  identity_verification: {
    type: [String],
    enum: ["idCard", "aadharCard", "panCard", "addressProof"],
    // required: true,
  },
});

profileSchema.pre("save", async function (next) {
  const user = this;
  //hash the password only if it has been modified(or is new)
  if (!user.isModified("password")) return next();
  try {
    //salt generation
    const salt = await bcrypt.genSalt(10);
    //hashing the password
    const hashedPassword = await bcrypt.hash(user.password, salt);

    //override the plain password with the hashed one to store it
    user.password = hashedPassword;
    next();
  } catch (err) {
    return next(err);
  }
});

profileSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    //use bcrypt to compare the provided password with the hashed password
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (err) {
    throw err;
  }
};

//create profile model
const Profile = mongoose.model("Profile", profileSchema);
module.exports = Profile;
