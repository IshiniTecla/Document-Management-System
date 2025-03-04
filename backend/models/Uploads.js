import mongoose from "mongoose";

const UploadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  deadline: { type: Date, required: true },
  file: {
    data: Buffer,
    contentType: String,
    fileName: String,
  },
  status: {
    type: String,
    enum: ["Pending", "Signed", "Rejected"],
    default: "Pending",
  },
  uploadedAt: { type: Date, default: Date.now }, // Timestamp
});

export default mongoose.model("Upload", UploadSchema);
