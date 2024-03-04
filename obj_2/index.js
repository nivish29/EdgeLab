const express = require("express");
const cors = require("cors");

// Create an Express application
const app = express();

// Use CORS middleware
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Sample data
let messages = [];

// Define routes
app.get("/messages", (req, res) => {
  res.json(messages);
});

app.post("/messages", (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }

  const newMessage = { id: generateId(), text };
  messages.push(newMessage);

  res.status(201).json(newMessage);
});

app.put("/messages/:id", (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  console.log(id);

  const messageIndex = messages.findIndex((message) => message.id === id);
  if (messageIndex === -1) {
    return res.status(404).json({ error: "Message not found" });
  }

  messages[messageIndex].text = text;
  res.json(messages[messageIndex]);
});

app.delete("/messages/:id", (req, res) => {
  const { id } = req.params;

  const messageIndex = messages.findIndex((message) => message.id === id);
  if (messageIndex === -1) {
    return res.status(404).json({ error: "Message not found" });
  }

  const deletedMessage = messages.splice(messageIndex, 1)[0];
  res.json(deletedMessage);
});

// Generate a unique ID for messages
function generateId() {
  return "_" + Math.random().toString(36).substr(2, 9);
}

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
