import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    // clerk user id for login and signup
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true } // timestamps creates createdAt and updatedAt by default
);

// user.model.js
export const User = mongoose.model("User", userSchema);
