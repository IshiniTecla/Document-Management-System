import express from "express";
import Items from "../models/Items.js";

const router = express.Router();

// Generate unique code based on category
const generateItemCode = async (category) => {
  const lastItem = await Items.findOne({ category }).sort({ code: -1 });

  let nextCode = lastItem
    ? (parseInt(lastItem.code, 10) + 1).toString().padStart(3, "0")
    : "001";

  return nextCode;
};

// Add a new item
router.post("/", async (req, res) => {
  const { name, quantity, category } = req.body;

  try {
    const code = await generateItemCode(category);

    // Check for duplicates before saving
    const existingItem = await Items.findOne({ code });
    if (existingItem) {
      return res.status(400).json({ error: "Duplicate item code. Try again." });
    }

    const newItem = new Items({ code, name, quantity, category });
    await newItem.save();

    res.status(201).json({ message: "Item added successfully", newItem });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error adding item", details: error.message });
  }
});

// Fetch all items
router.get("/", async (req, res) => {
  try {
    const allItems = await Items.find();
    res.status(200).json(allItems);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching items", details: error.message });
  }
});

// Get next available code for a category
router.get("/next-code/:category", async (req, res) => {
  const { category } = req.params;

  try {
    const code = await generateItemCode(category);
    res.status(200).json({ code });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error generating code", details: error.message });
  }
});

// Update an item by code
router.put("/:code", async (req, res) => {
  const { code } = req.params;
  const { name, quantity, category } = req.body;

  try {
    const updatedItem = await Items.findOneAndUpdate(
      { code },
      { name, quantity, category },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.status(200).json({ message: "Item updated successfully", updatedItem });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error updating item", details: error.message });
  }
});

// Delete an item by code
router.delete("/:code", async (req, res) => {
  const { code } = req.params;

  try {
    const deletedItem = await Items.findOneAndDelete({ code });

    if (!deletedItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.status(200).json({ message: "Item deleted successfully", deletedItem });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Error deleting item", details: error.message });
  }
});

export default router;
