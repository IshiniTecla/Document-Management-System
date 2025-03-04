import express from "express";
import bcrypt from "bcrypt";
import Manager from "../models/Manager.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

const router = express.Router();

// Register a new manager
router.post("/", async (req, res) => {
  const { name, NIC, email, phone, password, role } = req.body;
  try {
    const user = await Manager.findOne({
      email: { $regex: `^${email}$`, $options: "i" },
    });
    if (user) {
      return res.status(409).json({ message: "User already exists" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newManager = new Manager({
      name,
      NIC,
      email,
      phone,
      password: hashPassword,
      role,
    });
    await newManager.save();
    return res.status(201).json({ message: "Registered successfully" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Get all managers
router.get("/", async (req, res) => {
  try {
    const managers = await Manager.find({});
    return res.status(200).json({ data: managers });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
});

router.post("/login", async (req, res) => {
  //login
  const { email, password } = req.body;
  try {
    const user = await Manager.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT, {
      expiresIn: "1d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      // Secure: true, // Uncomment in production if served over HTTPS
      maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
      // SameSite: 'Lax' // Consider setting same-site policy based on your requirements
    });

    return res.json({ status: true, message: "Login successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// Get manager by email
router.get("/email/:email", async (req, res) => {
  console.log("Raw URL:", req.originalUrl); // Logs the full URL
  console.log("Email parameter:", req.params.email); // Debugging line

  // Validate email format
  const email = req.params.email;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  try {
    const manager = await Manager.findOne({
      email: req.params.email,
    });
    if (!manager) {
      return res.status(404).json({ message: "Manager not found" });
    }
    return res.status(200).json({ data: manager });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Get manager by ID (General route)
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    // Ensure the ID is a valid ObjectId before querying
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID format" });
    }
    const manager = await Manager.findById(id);
    if (!manager) {
      return res.status(404).json({ message: "Manager not found" });
    }
    return res.status(200).json({ data: manager });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
});

// Update a manager by ID
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Manager.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) {
      return res.status(404).json({ message: "Manager not found" });
    }
    return res.status(200).json({ message: "Manager updated successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
});

// Delete a manager by ID
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Manager.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "Manager not found" });
    }
    return res.status(200).json({ message: "Manager deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
});

export default router;
