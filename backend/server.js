const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");

// Import Routes
const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/product.routes");
const cartRoutes = require("./routes/cart.routes");
const orderRoutes = require("./routes/order.routes");
const paymentRoutes = require("./routes/payment.routes");

const app = express();
const server = http.createServer(app); // Create HTTP server for Socket.io
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// ✅ Real-Time Bidding Logic
let bids = {
  "Organic Mangoes": 1400,
  "Fresh Tomatoes": 400,
  "Farm Fresh Milk": 300,
};

// WebSocket Connection
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  // Send current bid data when a user connects
  socket.emit("updateBids", bids);

  // Handle new bids
  socket.on("placeBid", ({ product, amount }) => {
    if (amount > bids[product]) {
      bids[product] = amount;
      io.emit("updateBids", bids); // Broadcast updated bids to all clients
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
