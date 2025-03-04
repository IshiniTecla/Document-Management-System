import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    default: 0,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Item", ItemSchema);
