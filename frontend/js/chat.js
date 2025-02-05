const socket = io("http://localhost:5000");
const messages = document.getElementById("messages");
const messageInput = document.getElementById("messageInput");
const sendButton = document.getElementById("sendButton");
const typingIndicator = document.getElementById("typingIndicator");
const logoutButton = document.getElementById("logoutButton");

// Join a room
const room = "general"; // Replace with dynamic room selection
socket.emit("joinRoom", room);

// Send message
sendButton.addEventListener("click", () => {
  const message = messageInput.value;
  if (message) {
    const username = localStorage.getItem("username");
    socket.emit("sendMessage", { room, from_user: username, message });
    messageInput.value = "";
  }
});

// Typing indicator
messageInput.addEventListener("input", () => {
  const username = localStorage.getItem("username");
  socket.emit("typing", { room, username });
});

// Receive message
socket.on("receiveMessage", (data) => {
  const { from_user, message } = data;
  const messageElement = document.createElement("div");
  messageElement.textContent = `${from_user}: ${message}`;
  messages.appendChild(messageElement);
  messages.scrollTop = messages.scrollHeight;
});

// Typing indicator
socket.on("typing", (data) => {
  const { username } = data;
  typingIndicator.textContent = `${username} is typing...`;
  setTimeout(() => {
    typingIndicator.textContent = "";
  }, 3000);
});

// Logout
logoutButton.addEventListener("click", () => {
  localStorage.removeItem("username");
  window.location.href = "login.html";
});