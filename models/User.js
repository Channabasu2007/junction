import mongoose from "mongoose";
import Feedbacks from "../Components/DashboardMiddle/Feedbacks";

const qualificationSchema = new mongoose.Schema(
  {
    courseName: { type: String, default: "" },
    institution: { type: String, default: "" },
    duration: { type: String, default: "" },
    credential: { type: String, default: "" },
  },
  { _id: false }
);

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
  businessEmail: String,
  phone: String,
  bio: String,
  otp: {
    type: String,
  },
  verificationTries: {
    type: Number,
    default: 0,
  },
  otpExpires: {
    type: Date,
    required: [true, "OTP expiration time is required"],
  },
  verified: {
    type: Boolean,
    default: false,
  },
  userName: {
    type: String,
  },
  isPremium: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    required: [true, "Created at date is required"],
    default: Date.now,
  },
  profileUrl: String,
  bannerUrl: String,
  jobs: Array,
  nickname: String,
  DOB: String,
  workStatus: String,
  hasWorkedInCompany: Boolean,
  qualification: String,
  location: String,

  // -------------------- Added Education Fields --------------------
  showEducation: { type: Boolean, default: true },

  primarySchool: {
    school: { type: String, default: "" },
    year: { type: String, default: "" },
    board: { type: String, default: "" },
  },

  secondarySchool: {
    school: { type: String, default: "" },
    year: { type: String, default: "" },
    board: { type: String, default: "" },
    percentage: { type: String, default: "" },
  },

  highSchool: {
    school: { type: String, default: "" },
    board: { type: String, default: "" },
    year: { type: String, default: "" },
    percentage: { type: String, default: "" },
    stream: { type: String, default: "" },
  },

  college: {
    collegeName: { type: String, default: "" },
    year: { type: String, default: "" },
    degree: { type: String, default: "" },
    percentage: { type: String, default: "" },
    field: { type: String, default: "" },
  },
  sites: Array,
  qualifications: [qualificationSchema],
  FeedbacksCredentials: {
    allowFeedbacks: { type: Boolean, default: false },
    recieveEmails: { type: Boolean, default: false },
    longMessages: { type: Boolean, default: false },
    enhancedFeedbacks: { type: Boolean, default: false },
  },
  SEO: {
    title: { type: String, default: "" },
    description: { type: String, default: "" },
    keywords: { type: Array, default: [] },
    thumbnailUrl: { type: String, default: "" },
  },
  videoId: String,

  // ---------------------------------------------------------------
});

export default mongoose.models.User || mongoose.model("User", UserSchema);
