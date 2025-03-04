import express from "express";
import multer from "multer";
import Upload from "../models/Uploads.js";

const router = express.Router();

// Configure multer to store files in memory
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Max file size of 10MB
  fileFilter: (req, file, cb) => {
    const allowedTypes = /pdf|doc|docx|png/;
    const extname = allowedTypes.test(file.originalname.toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(
        new Error(
          "Invalid file type. Only PDF, DOC, DOCX, and PNG files are allowed."
        )
      );
    }
  },
});

// **1️ Upload File**
router.post("/", upload.single("file"), async (req, res) => {
  try {
    const { name, deadline } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "File is required." });
    }

    const newUpload = new Upload({
      name,
      deadline,
      file: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
        fileName: req.file.originalname,
      },
      // status will be "Pending" by default
    });

    const savedUpload = await newUpload.save();

    res.status(201).json({
      message: "File uploaded successfully.",
      upload: savedUpload,
    });
  } catch (err) {
    console.error("Upload Error:", err);
    res
      .status(500)
      .json({ message: "Error uploading file.", error: err.message });
  }
});

// **2️ Get All Uploads**
router.get("/", async (req, res) => {
  try {
    const uploads = await Upload.find();
    res.status(200).json(uploads);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching uploads.", error: err.message });
  }
});

// **2a. Get Only Pending Uploads** (for manager’s pending documents table)
router.get("/pending", async (req, res) => {
  try {
    const pendingUploads = await Upload.find({ status: "Pending" });
    res.status(200).json(pendingUploads);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching pending uploads.", error: err.message });
  }
});

// **3️ Download a File by ID**
router.get("/:id/download", async (req, res) => {
  try {
    const upload = await Upload.findById(req.params.id);

    if (!upload) {
      return res.status(404).json({ message: "File not found." });
    }

    res.set({
      "Content-Type": upload.file.contentType,
      "Content-Disposition": `attachment; filename="${upload.file.fileName}"`,
    });

    res.send(upload.file.data);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching file.", error: err.message });
  }
});

// **4️ Update an Upload by ID**
router.put("/:id", upload.single("file"), async (req, res) => {
  try {
    const { name, deadline } = req.body;
    const updateData = { name, deadline };

    if (req.file) {
      updateData.file = {
        data: req.file.buffer,
        contentType: req.file.mimetype,
        fileName: req.file.originalname,
      };
    }

    const updatedUpload = await Upload.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedUpload) {
      return res.status(404).json({ message: "Upload not found." });
    }

    res.status(200).json({
      message: "Upload updated successfully.",
      upload: updatedUpload,
    });
  } catch (err) {
    console.error("Update Error:", err);
    res
      .status(500)
      .json({ message: "Error updating upload.", error: err.message });
  }
});

// **5️ Delete an Upload by ID**
router.delete("/:id", async (req, res) => {
  try {
    const deletedUpload = await Upload.findByIdAndDelete(req.params.id);

    if (!deletedUpload) {
      return res.status(404).json({ message: "Upload not found." });
    }

    res.status(200).json({ message: "Upload deleted successfully." });
  } catch (err) {
    console.error("Delete Error:", err);
    res
      .status(500)
      .json({ message: "Error deleting upload.", error: err.message });
  }
});

// **6️ Manager Actions: Sign or Reject a File**
router.post("/:id/sign", async (req, res) => {
  try {
    const upload = await Upload.findByIdAndUpdate(
      req.params.id,
      { status: "Signed" },
      { new: true }
    );
    if (!upload) {
      return res.status(404).json({ message: "Upload not found." });
    }
    res.status(200).json({ message: "File signed successfully", upload });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error signing file.", error: err.message });
  }
});

router.post("/:id/reject", async (req, res) => {
  try {
    const upload = await Upload.findByIdAndUpdate(
      req.params.id,
      { status: "Rejected" },
      { new: true }
    );
    if (!upload) {
      return res.status(404).json({ message: "Upload not found." });
    }
    res.status(200).json({ message: "File rejected successfully", upload });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error rejecting file.", error: err.message });
  }
});
export default router;
