import mongoose from "mongoose";

const SalesDataSchema = new mongoose.Schema({
  orderDate: { type: Date, required: true },
  salesChannel: { type: String, required: true },
  product: { type: String, required: true },
  orderType: { type: String, required: true },
  salesPerson: { type: String, required: true },
  customerType: { type: String, required: true },
  region: { type: String, required: true },
  revenue: { type: Number, required: true },
  discount: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
});

export default mongoose.model("SalesData", SalesDataSchema);
