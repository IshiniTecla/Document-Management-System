import mongoose from "mongoose";

const MeetingSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // Meeting title
    date: { type: String, required: true }, // Store as String if coming as text
    time: { type: String, required: true }, // Store time as String (e.g., "10:00 AM")
    description: { type: String, default: "" }, // Description is optional
    attendees: [{ type: String, required: true }], // List of attendee emails
  },
  { timestamps: true }
);

export default mongoose.model("Meeting", MeetingSchema);
