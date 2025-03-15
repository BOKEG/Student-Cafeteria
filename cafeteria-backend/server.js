const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const http = require("http"); // Import HTTP module
const { Server } = require("socket.io"); // Import Socket.IO

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app); // Create HTTP server
const io = new Server(server, { cors: { origin: "*" } }); // Initialize Socket.IO

app.use(express.json());
app.use(cors());

// Listen for new socket connections
io.on("connection", (socket) => {
    console.log(`🟢 New client connected: ${socket.id}`);
  
    socket.on("disconnect", () => {
      console.log(`🔴 Client disconnected: ${socket.id}`);
    });
  });

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/menu", require("./routes/menuRoutes"));
app.use("/api/orders", require("./routes/orderRoutes")(io));


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
