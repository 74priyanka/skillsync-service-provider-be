const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const customerProfileSchema = new mongoose.Schema({
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
  contact: {
    type: String,
    // required: true,
  },
  gender: {
    type: String,
    enum: ["female", "male", "other"],
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
});

customerProfileSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    next();
  } catch (err) {
    return next(err);
  }
});

customerProfileSchema.methods.comparePassword = async function (
  candidatePassword
) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch (err) {
    throw err;
  }
};

const customerProfile = mongoose.model(
  "customerProfile",
  customerProfileSchema
);
module.exports = customerProfile;
