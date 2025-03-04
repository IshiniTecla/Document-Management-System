import express from "express";
import multer from "multer";
import XLSX from "xlsx";
import SalesData from "../models/SalesData.js";

const router = express.Router();

// Configure Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Upload Excel and Save to DB
router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    // Read Excel file
    const workbook = XLSX.read(req.file.buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0];
    const jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

    if (jsonData.length === 0) {
      return res.status(400).json({ error: "Empty Excel file" });
    }

    // Format and Save Data
    const salesDataArray = jsonData.map((row) => ({
      orderDate: row.Date ? new Date(row.Date) : null,
      salesChannel: row["Sales Channel"] || "",
      product: row.Product || "",
      orderType: row["Order Type"] || "",
      salesPerson: row["Sales Person"] || "",
      customerType: row["Customer Type"] || "",
      region: row.Region || "",
      revenue: row["Revenue (LKR)"] ? parseFloat(row["Revenue (LKR)"]) : 0,
      discount: row["Discount Given (LKR)"]
        ? parseFloat(row["Discount Given (LKR)"])
        : 0,
      paymentMethod: row["Payment Method"] || "",
    }));

    await SalesData.insertMany(salesDataArray);
    res.status(201).json({ message: "Sales data uploaded successfully!" });
  } catch (error) {
    console.error("Error uploading sales data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Get Sales Data
router.get("/", async (req, res) => {
  try {
    const salesData = await SalesData.find();
    res.status(200).json(salesData);
  } catch (error) {
    console.error("Error fetching sales data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;
