const http = require("http");
const app = require("./app");
const connectDB = require("./config/db");
const { initSocket } = require("./config/socket");

const PORT = process.env.PORT || 5000;

connectDB();

const server = http.createServer(app);

// Initialize socket
initSocket(server);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
