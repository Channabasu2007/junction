import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, "First name is required"],
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  otp: {
    type: String,
  },
  verificationTries: {
    type: Number,
    default: 0
  },
  otpExpires: {
    type: Date,
    required: [true, "OTP expiration time is required"],
  },
  verified: {
    type: Boolean,
    default: false
  },
  userName: {
    type: String,
  },
  createdAt: {
    type: Date,
    required: [true, "Created at date is required"],
    default: Date.now,
  },
  
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
