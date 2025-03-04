import express from "express";
import multer from "multer";
import Invoice from "../models/Invoices.js";

const router = express.Router();

// Setup file upload storage (using memory storage for simplicity)
const upload = multer({ storage: multer.memoryStorage() }); // Store files in memory

// Add a new invoice
router.post("/add", upload.single("file"), async (req, res) => {
  console.log(req.body); // Log form data
  console.log(req.file); // Log file data
  try {
    const { title, category } = req.body;
    const fileData = req.file;

    if (!fileData)
      return res.status(400).json({ message: "File upload required" });

    const newInvoice = new Invoice({
      title,
      category,
      file: {
        data: fileData.buffer,
        contentType: fileData.mimetype,
      },
    });

    await newInvoice.save();
    res.status(201).json({ message: "Invoice added successfully", newInvoice });
  } catch (error) {
    console.error("Error adding invoice:", error);
    res.status(500).json({ error: "Error adding invoice" });
  }
});

// Get invoices with optional category filter
router.get("/", async (req, res) => {
  const { category } = req.query;
  try {
    const query = category ? { category } : {};
    const invoices = await Invoice.find(query).select("-file.data"); // Exclude file data from response
    res.status(200).json(invoices);
  } catch (error) {
    console.error("Error fetching invoices:", error);
    res.status(500).json({ error: "Error fetching invoices" });
  }
});

// Fetch a specific invoice file by ID (view invoice)
router.get("/file/:id", async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);

    if (!invoice || !invoice.file) {
      return res.status(404).json({ error: "File not found" });
    }

    res.contentType(invoice.file.contentType);
    res.send(invoice.file.data);
  } catch (error) {
    console.error("Error fetching file:", error);
    res.status(500).json({ error: "Error fetching file" });
  }
});

// Edit an invoice by ID
router.put("/:id", upload.single("file"), async (req, res) => {
  const { title, category } = req.body;
  const fileData = req.file;

  try {
    const invoice = await Invoice.findById(req.params.id);

    if (!invoice) {
      return res.status(404).json({ error: "Invoice not found" });
    }

    // Update title and category
    if (title) invoice.title = title;
    if (category) invoice.category = category;

    // If a new file is uploaded, update it
    if (fileData) {
      invoice.file = {
        data: fileData.buffer,
        contentType: fileData.mimetype,
      };
    }

    await invoice.save();
    res.status(200).json({ message: "Invoice updated successfully", invoice });
  } catch (error) {
    console.error("Error updating invoice:", error);
    res.status(500).json({ error: "Error updating invoice" });
  }
});

// Delete an invoice by ID
router.delete("/:id", async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndDelete(req.params.id);

    if (!invoice) {
      return res.status(404).json({ error: "Invoice not found" });
    }

    res.status(200).json({ message: "Invoice deleted successfully" });
  } catch (error) {
    console.error("Error deleting invoice:", error);
    res.status(500).json({ error: "Error deleting invoice" });
  }
});

export default router;
