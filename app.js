const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cors = require("cors");
const routerNavigation = require("./src/routesNavigation");
// ==============================
const socket = require("socket.io");
// ==============================

const app = express();
app.use(cors());

// ==============================
const http = require("http");
const server = http.createServer(app);
const io = socket(server, {
  cors: {
    origin: "*",
  },
});
io.on("connection", (socket) => {
  console.log("Socket.io Connect !");
  // global Message = pesan yang di kirimkan ke semua client
  // private Message = pesan yang hanya dikirimkan ke client saja
  // broadcast Message = pesan yang di kirimkan ke semua client kecuali si pengirim
  // room = ruangan pesan yang bisa di akses/ dimasuki client
  socket.on("globalMessage", (data) => {
    console.log(data);
    io.emit("chatMessage", data);
  });
  socket.on("privateMessage", (data) => {
    socket.emit("chatMessage", data);
  });
  socket.on("broadcastMessage", (data) => {
    socket.broadcast.emit("chatMessage", data);
  });
  socket.on("joinRoom", (data) => {
    console.log(data);
    socket.join(data.room);
  });
  socket.on("roomMessage", (data) => {
    io.to(data.room).emit("chatMessage", data);
  });
});
// ==============================

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.use("/", routerNavigation);

server.listen(3000, () => {
  console.log("Listening on Port 3000");
});
