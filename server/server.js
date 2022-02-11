const express = require("express");
const http = require("http");
const path = require("path");
const socketIo = require("socket.io");
const dotenv = require("dotenv");
const colors = require("colors");

// middleware
const cors = require("cors")
const { corsMiddleware } = require('./middleware/corsMiddleware')

// Routes
const userRoutes = require('./routes/userRoutes')


dotenv.config();

const app = express();

app.use(express.json());
app.use(cors())
app.use(corsMiddleware);


app.use('/api/users', userRoutes)


//------------------------------- static build files for react side of app -------------------------------//

const modifiedPath = __dirname.split('/').slice(0, -1).join('/')

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(modifiedPath, "/client/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(modifiedPath, "client", "build", "index.html"))
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running....");
  });
}

const PORT = process.env.PORT || 5000


const server = http.createServer(app).listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));

const io = socketIo(server, {cors: {origin: process.env.NODE_ENV === "development" ? "*" : "https://toshi-chat.herokuapp.com/"}});

io.on("connection", (socket) => {
  console.log(`${io.engine.clientsCount} connections`);

  socket.on('chat', (msg, name) => {
    io.sockets.emit('msg', 'new-msg', msg, name)
  })

  socket.on('new-user', (name) => {
    socket.broadcast.emit('msg', 'notification', `${name} has entered the chat`, null)
  })

  socket.on('user-left', (name) => {
    socket.broadcast.emit('msg', 'notification', `${name} has left the chat`, null)
  })

  socket.on("disconnect", (name) => {
    socket.broadcast.emit('msg', 'notification', `user has left the chat`, null)
  });
});