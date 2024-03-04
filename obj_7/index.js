const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");

const packageDefinition = protoLoader.loadSync("example.proto", {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});

const { ChatService } = grpc.loadPackageDefinition(packageDefinition);

const clients = [];

function joinStream(stream) {
  clients.push(stream);

  stream.on("data", (message) => {
    console.log(`Received message from ${message.sender}: ${message.message}`);
    // Broadcast the message to all other clients
    clients.forEach((client) => {
      if (client !== stream) {
        client.write(message);
      }
    });
  });

  stream.on("end", () => {
    const index = clients.indexOf(stream);
    if (index !== -1) {
      clients.splice(index, 1);
    }
  });
}

const server = new grpc.Server();
server.addService(ChatService.service, { JoinStream: joinStream });

server.bindAsync(
  "0.0.0.0:50051",
  grpc.ServerCredentials.createInsecure(),
  (err, port) => {
    if (err) {
      console.error("Failed to start gRPC server:", err);
      return;
    }
    console.log(`gRPC server is running on port ${port}`);
    server.start();
  }
);
