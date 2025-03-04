import mongoose from "mongoose";

const InvoiceSchema = new mongoose.Schema({
  title: String,
  category: String,
  date: { type: Date, default: Date.now },
  file: {
    data: { type: Buffer, required: true }, // Store binary data in the database
    contentType: { type: String, required: true }, // Store MIME type of the file
  },
});
export default mongoose.model("Invoice", InvoiceSchema);
