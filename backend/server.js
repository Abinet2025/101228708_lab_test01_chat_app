const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const chatRoutes = require("./routes/chat");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect("mongodb://localhost:27017/chat_app", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Routes
app.use("/auth", authRoutes);
app.use("/chat", chatRoutes);

// Socket.io Connection
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("joinRoom", (room) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });

  socket.on("leaveRoom", (room) => {
    socket.leave(room);
    console.log(`User left room: ${room}`);
  });

  socket.on("sendMessage", async (data) => {
    const { room, from_user, message } = data;
    const newMessage = new Message({ from_user, room, message });
    await newMessage.save();

    io.to(room).emit("receiveMessage", { from_user, message });
  });

  socket.on("typing", (data) => {
    const { room, username } = data;
    socket.to(room).emit("typing", { username });
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

// Start Server
const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});