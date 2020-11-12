const express = require("express");
const severController = require("./controllers/indexController");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const app = express();
const secretkey = "chihuahua";
const cors = require("cors");
const bodyParser = require("body-parser");
const port = 4000;
const http = require("http");
const server = http.createServer(app);
//fire controllers
app.use(bodyParser.json()); //nangalimtan nim
app.use(cors()); //FOR CROSS-ORIGIN
severController(app, jwt, mongoose, secretkey);
const users = {};
const io = require("socket.io")(server);
// this
let user = {}
io.on("connection", (socket) => {
  socket.emit("socID", socket.id);
  socket.on("new-user", (name) => {
    users[socket.id] = name;
    console.log(user)
    socket.broadcast.emit("user-connected", name);
  });
  // talking to another person
  socket.on("send message", (body) => {
    io.emit("message", body);
  });
});
server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
