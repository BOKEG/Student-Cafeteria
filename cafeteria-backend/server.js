import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import orderRoutes from "./routes/orderRoutes.js"; // Ensure orderRoutes accepts io instance

// ✅ Load environment variables
dotenv.config();

// ✅ Connect to Database
const startDB = async () => {
  try {
    await connectDB();
    console.log("✅ MongoDB Connected Successfully!");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
    process.exit(1);
  }
};
startDB();

const app = express();
const server = http.createServer(app); // Create HTTP server

// ✅ Convert __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Initialize Socket.IO
const io = new Server(server, {
  cors: {
    origin: [process.env.FRONTEND_URL || "http://localhost:3000"], // Allow both local & deployed frontend
    methods: ["GET", "POST"],
  },
});

// ✅ Middleware
app.use(express.json());
app.use(cors({
  origin: [process.env.FRONTEND_URL || "http://localhost:3000"],
  methods: ["GET", "POST"],
  credentials: true,
}));

// ✅ Handle Socket.IO Connections
io.on("connection", (socket) => {
  console.log(`🟢 Client Connected: ${socket.id}`);

  socket.on("disconnect", () => {
    console.log(`🔴 Client Disconnected: ${socket.id}`);
  });
});

// ✅ Routes
app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes(io)); // Pass io to order routes

// ✅ Serve Frontend in Production
if (process.env.NODE_ENV === "production") {
  const frontendPath = path.join(__dirname, "../cafeteria-frontend/build");
  app.use(express.static(frontendPath));

  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendPath, "index.html"));
  });
}

// ✅ Graceful Shutdown
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
