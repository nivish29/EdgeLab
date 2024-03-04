const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const readline = require("readline");

const packageDefinition = protoLoader.loadSync("example.proto", {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const { ChatService } = grpc.loadPackageDefinition(packageDefinition);

const client = new ChatService(
  "localhost:50051",
  grpc.credentials.createInsecure()
);

const username = "User " + Math.floor(Math.random() * 1000); // Generate a random username

const stream = client.JoinStream();

stream.on("data", (message) => {
  if (message.sender !== username) {
    console.log(`${message.sender}: ${message.message}`);
  }
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.on("line", (input) => {
  const message = { sender: username, message: input };
  stream.write(message);
});

console.log(
  `You are logged in as ${username}. Type messages and press Enter to send.`
);
