const express = require("express");
const cors = require("cors");

// Create an Express application
const app = express();

// Middleware to parse JSON bodies
app.use(cors());
app.use(express.json());

// Define a route to handle webhook requests
app.post("/webhook", (req, res) => {
  // Extract data from the webhook request
  const { event, data } = req.body;

  // Log the received webhook request
  console.log("Received webhook request:");
  console.log("Event:", event);
  console.log("Data:", data);

  // Process the webhook data
  console.log("Processing webhook data...");

  // Respond to the webhook request
  res.status(200).send("Webhook received successfully");
});

// Serve the HTML webpage
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
