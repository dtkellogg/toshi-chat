const express = require("express");
const http = require("http");
const path = require("path");
const socketIo = require("socket.io");
const colors = require("colors");


// middleware
const cors = require("cors")
const { corsMiddleware } = require('./middleware/corsMiddleware')

const app = express();
app.use(express.json());
app.use(cors())  // CORS
app.use(corsMiddleware);

//---------------------- static build files for react side of app ----------------------//

const modifiedPath = __dirname.split('/').slice(0, -1).join('/')

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(modifiedPath, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(modifiedPath, "frontend", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

const PORT = process.env.PORT || 5000


const server = http.createServer(app).listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));

const io = socketIo(server, {cors: {origin: "http://localhost:3000"}});

io.on("connection", (socket) => {
  console.log(`${io.engine.clientsCount} connections`);

  socket.on('chat', ({msg, name}) => {
    io.sockets.emit('msg', msg, name, "purple")
  })

  socket.on('new-user', () => {
    socket.broadcast.emit('new-user', "A new user has entered the chat.", "green")
  })

  socket.on("disconnect", (name) => {
    console.log(`disconnect: ${socket.id}`);
    socket.broadcast.emit('user-gone', `${name} has left the chat.`, "red")
  });
});