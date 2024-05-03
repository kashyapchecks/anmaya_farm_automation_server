const http = require("http");
const express = require("express");
const cors = require("cors");

const dotEnv = require("dotenv");

dotEnv.config();

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

const { socketHandler } = require("./routes/socket");
const connectToDb = require("./db/db_connect");
const { error } = require("console");

//connecting to database
connectToDb()
  .then(() => {
    console.log("connected to database");
    io.on("connection", socketHandler);
    app.use("/api", require("./routes/http"));
  })
  .catch((err) => {
    console.log(err);
  });

const PORT = 8000;

server.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});
