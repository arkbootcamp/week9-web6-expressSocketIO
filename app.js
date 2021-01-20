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
const io = socket(server);
io.on("connection", (socket) => {
  console.log("Socket.io Connect !");
  // global Message = pesan yang di kirimkan ke semua client
  // private Message = pesan yang hanya dikirimkan ke client saja
  // broadcast Message = pesan yang di kirimkan ke semua client kecuali si pengirim
  // room = ruangan pesan yang bisa di akses/ dimasuki client
});
// ==============================

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));

app.use("/", routerNavigation);

server.listen(3000, () => {
  console.log("Listening on Port 3000");
});
