const NodesStateSchema = require("../model/nodes_state");
const emailSender = require("../model/email");
const SocketIdToNode = new Map();
const NodeToSocketId = new Map();

const handleDisconnect = async (socket) => {
  try {
    const node_name = SocketIdToNode.get(socket.id);
    SocketIdToNode.delete(socket.id);
    NodeToSocketId.delete(node_name);
    if (node_name && node_name !== "admin-panel") {
      setTimeout(async () => {
        if (!NodeToSocketId.get(node_name)) {
          await NodesStateSchema.updateMany(
            {},
            { $set: { node_state: false } }
          );
          console.log("disconected");

          //sending alert email

          emailSender(
            "magowtham7@gmail.com",
            "Raspberry Pii Disconnected",
            "Raspberry pii is disconnected from the server please verify it once..."
          )
            .then(() => {
              console.log("email sent");
            })
            .catch((error) => {
              console.log(error);
            });
        } else {
          console.log("ignored");
        }
      }, 5000);
    }
  } catch (error) {
    console.log(error);
  }
};

const handleRoomJoin = (data, socket) => {
  const { node_name } = data;
  SocketIdToNode.set(socket.id, node_name);
  NodeToSocketId.set(node_name, socket.id);
  socket.join("anmaya-iot");
  socket.emit("joined-room");
};

const handleMotor1 = async (data, socket) => {
  const { state } = data;
  try {
    await NodesStateSchema.updateOne(
      {
        node_name: "motor1",
      },
      { $set: { node_state: state } }
    );
    console.log(state);
    socket.broadcast.to("anmaya-iot").emit("motor1", { state });
  } catch (error) {
    console.log(error);
  }
};

const handleMotor1Ack = (data, socket) => {
  console.log("acknowledgement recieved");
  socket.broadcast.to("anmaya-iot").emit("motor1-ack", data);
};

module.exports = {
  handleDisconnect,
  handleRoomJoin,
  handleMotor1,
  handleMotor1Ack,
};
