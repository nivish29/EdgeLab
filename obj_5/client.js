const WebSocket = require("ws");

// Connect to the WebSocket server
const ws = new WebSocket("ws://localhost:8080");

// Handle connection open event
ws.on("open", function open() {
  console.log("Connected to server");

  // Check if the connection is open before sending a message
  if (ws.readyState === WebSocket.OPEN) {
    // Send a message to the server
    ws.send("Hello, server!");
  }
});

// Handle messages from the server
ws.on("message", function incoming(message) {
  const messageString = message.toString("utf-8");
  console.log("Received message from server:", messageString);
});

// Handle connection close event
ws.on("close", function close() {
  console.log("Disconnected from server");
});
