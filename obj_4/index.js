const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

let text = ""; // Shared text between clients

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/events", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  // Send current text to client upon connection
  res.write(`data: ${JSON.stringify({ text })}\n\n`);

  // Listen for updates from client
  req.on("data", () => {
    res.write(`data: ${JSON.stringify({ text })}\n\n`);
  });
});

app.post("/update", express.json(), (req, res) => {
  const { newText } = req.body;
  text = newText; // Update shared text
  res.sendStatus(200);
});

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
