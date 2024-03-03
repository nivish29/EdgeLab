const express = require("express");
const http = require("http");
const cors = require("cors");
const app = express();
const socketIo = require("socket.io");

app.use(cors());
app.use(express.json());

// Create an HTTP server
const server = http.createServer(app);

// Attach Socket.io to the HTTP server
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

// Listen for incoming connections
io.on("connection", (socket) => {
  console.log("A client connected");

  // Handle drawing events from clients
  socket.on("draw", (data) => {
    // Broadcast the drawing data to all connected clients including the sender
    io.emit("draw", data);
    console.log("Drawing event received and broadcasted:", data);
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("A client disconnected");
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
