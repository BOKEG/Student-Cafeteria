const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
const http = require("http"); 
const { Server } = require("socket.io"); 

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app); // Create HTTP server
const io = new Server(server, { cors: { origin: "http://localhost:3000",
  methods: ["GET", "POST"],
 } }); // Initialize Socket.IO

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
const orderRoutes = require("./routes/orderRoutes"); // Import as function
app.use("/api/orders", orderRoutes(io));



const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

