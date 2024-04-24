const http = require("http");
const express = require("express");
const cors = require("cors");

const dotEnv = require("dotenv");

dotEnv.config();

const app = express();
app.use(cors());
app.use(express.json());

const NodesStateSchema = require("./model/nodes_state");

const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});
const socketHandler = require("./routes/socket");
const connectToDb = require("./db/db_connect");

connectToDb();

const PORT = 8000;

io.on("connection", socketHandler);

app.post("/new_node", async (req, res) => {
  const { node_name } = req.body;

  try {
    await new NodesStateSchema({
      node_name,
    }).save();
    res.json({ status: true });
  } catch (error) {
    console.log(error);
  }
});

app.get("/node_states", async (req, res) => {
  const data = await NodesStateSchema.find({});
  res.json({ data });
});

server.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});
