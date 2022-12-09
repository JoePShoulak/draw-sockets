const express = require("express");
const socket = require("socket.io");

const PORT = 3001;

const app = express();
app.use(express.static("public"));

const server = app.listen(PORT);
console.log(`Server listening on port http://localhost:${PORT}!`);

const io = socket(server, {
  cors: {
    origin: `http://localhost:${PORT}`,
    methods: ["GET", "POST"],
    transports: ["websocket", "polling"],
    credentials: true,
  },
  allowEIO3: true,
});

const newConnection = (socket) => {
  const newDrawing = (data) => {
    socket.broadcast.emit("mouse", data);
  };

  console.log(`New connection: ${socket.id}`);
  socket.on("mouse", newDrawing);
};

io.sockets.on("connection", newConnection);
