const mqtt = require('mqtt');

// Connect to the MQTT broker
const client = mqtt.connect('mqtt://localhost:1883');

// Handle connection events
client.on('connect', () => {
  console.log('Connected to MQTT broker');
  // Subscribe to the chat room topic
  client.subscribe('chat/room', (err) => {
    if (!err) {
      console.log('Joined chat room');
    }
  });
});

// Handle incoming messages
client.on('message', (topic, message) => {
  console.log('New message:', message.toString());
});

// Handle error events
client.on('error', (error) => {
  console.error('Error:', error);
});
