import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    // Clerk User Id
    senderId: {
      type: String,
      required: true,
    },
    // Clerk User Id
    receiverId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // createdAt, updatedAt
);

export const Message = mongoose.model("message", messageSchema);
