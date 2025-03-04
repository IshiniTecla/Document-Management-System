import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import http from "http";
import { initSocket } from "./socket.js";
import LeaveagentRoute from "./routes/LeaveagentRoute.js";
import SalesmanagerRoute from "./routes/SalesmanagerRoute.js";
import ManagerRoute from "./routes/ManagerRoute.js";
import MeetingRoute from "./routes/MeetingRoute.js";
import UploadsRoute from "./routes/UploadsRoute.js";
import InvoiceRoute from "./routes/InvoiceRoute.js";
import SalesDataRoute from "./routes/SalesDataRoute.js";
import ItemsRoute from "./routes/ItemsRoute.js";
import NotificationRoute from "./routes/NotificationRoute.js";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = initSocket(server); // Initialize Socket.IO separately

const port = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";
const MONGO_URL = process.env.MONGO_URL;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Configuration
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);

// Attach `io` to `req` (for accessing it in routes)
app.use((req, res, next) => {
  req.io = io;
  next();
});

// API Routes
app.use("/leaveagents", LeaveagentRoute);
app.use("/managers", ManagerRoute);
app.use("/salesmanagers", SalesmanagerRoute);
app.use("/api/meetings", MeetingRoute);
app.use("/api/invoices", InvoiceRoute);
app.use("/api/sales", SalesDataRoute);
app.use("/api/items", ItemsRoute);
app.use("/api/notifications", NotificationRoute);
app.use("/api/uploads", UploadsRoute);

// Start Server
server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// Connect to MongoDB
mongoose
  .connect(MONGO_URL, {})
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.error("MongoDB connection failed:", error));
