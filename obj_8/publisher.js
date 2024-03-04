const mqtt = require('mqtt');
const readline = require('readline');

// Connect to the MQTT broker
const client = mqtt.connect('mqtt://localhost:1883');

// Interface for reading user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Handle connection events
client.on('connect', () => {
  console.log('Connected to MQTT broker');
  rl.question('Enter your name: ', (name) => {
    console.log(`Welcome, ${name}! Start chatting:`);
    // Publish user messages to the chat room topic
    rl.on('line', (input) => {
      client.publish('chat/room', `${name}: ${input}`);
    });
  });
});

// Handle error events
client.on('error', (error) => {
  console.error('Error:', error);
});
