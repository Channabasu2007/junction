import mongoose from "mongoose";
import Feedbacks from "../Components/DashboardMiddle/Feedbacks";
import { type } from "os";

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
  sites: [
    {
      name: { type: String },
      url: { type: String },
      clickHistory: [
        {
          clickedAt: { type: Date, default: Date.now },
        },
      ],
    },
  ],
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

  PageLayout: {
    bgImage: {
      url: {
        type: String,
        default:
          "https://images.pexels.com/photos/1031669/pexels-photo-1031669.jpeg",
      },
      opacity: { type: Number, default: 50 }, // 0–100%
      blur: { type: Number, default: 0 }, // px
      brightness: { type: Number, default: 100 }, // %
      contrast: { type: Number, default: 100 }, // %
      saturation: { type: Number, default: 100 }, // %
      grayscale: { type: Number, default: 0 }, // %
      sepia: { type: Number, default: 0 }, // %
      hue: { type: Number, default: 0 }, // deg
      overlayColor: { type: String, default: "#000000" }, // hex or rgba
    },
    ColorsPicker: {
      primary: { type: String, default: "#2563eb" },
      secondary: { type: String, default: "#9333ea" },
      paragraph: { type: String, default: "#374151" },
    },
  },
  pageViews: [
    {
      clickedDate: { type: Date, default: Date.now },
    },
  ],
  messages: [
    {
      content: { type: String },
      createdAt: { type: Date, default: Date.now },
      category: { type: String, default: "general" },
    },
  ],

});

export default mongoose.models.User || mongoose.model("User", UserSchema);
