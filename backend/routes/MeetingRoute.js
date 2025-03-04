import express from "express";
import Meeting from "../models/Meeting.js";
import { getIO } from "../socket.js";

const router = express.Router();

// Route to create a new meeting
router.post("/", async (req, res) => {
  try {
    console.log("Received request body:", req.body); // Debugging log

    const { title, date, time, attendees } = req.body;

    // Validate input
    if (!title || !date || !time || !attendees || attendees.length === 0) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Create a new meeting in MongoDB
    const newMeeting = new Meeting({ title, date, time, attendees });
    await newMeeting.save();

    // Send a real-time notification via socket.io
    const io = getIO();
    io.emit("new_notification", {
      message: `New meeting scheduled: ${title} on ${date} at ${time}`,
    });
  } catch (error) {
    console.error("Error scheduling meeting:", error);
  }
});

// Get all meetings
router.get("/", async (req, res) => {
  try {
    const meetings = await Meeting.find({});
    return res.status(200).json({ data: meetings });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Error fetching meetings" });
  }
});

// Get a specific meeting by ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const meeting = await Meeting.findById(id);

    if (!meeting) {
      return res.status(404).json({ message: "Meeting not found" });
    }

    return res.status(200).json({ data: meeting });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Error fetching the meeting" });
  }
});

// Update a meeting by ID
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedMeeting = await Meeting.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedMeeting) {
      return res.status(404).json({ message: "Meeting not found" });
    }

    return res
      .status(200)
      .json({ message: "Meeting updated successfully", data: updatedMeeting });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Error updating the meeting" });
  }
});

// Cancel a meeting (delete by ID)
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedMeeting = await Meeting.findByIdAndDelete(id);

    if (!deletedMeeting) {
      return res.status(404).json({ message: "Meeting not found" });
    }

    return res.status(200).json({ message: "Meeting canceled successfully" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Error canceling the meeting" });
  }
});

export default router;
