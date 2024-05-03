const NodeModel = require("../../model/node_model");
const emailSender = require("../../model/email");

const SocketIdToNode = new Map();
const NodeToSocketId = new Map();

const handleConnect = () => {
  console.log("connected");
};

const handleDisconnect = async (socket) => {
  try {
    const node_name = SocketIdToNode.get(socket.id);
    SocketIdToNode.delete(socket.id);
    NodeToSocketId.delete(node_name);
    if (node_name && node_name !== "admin-panel") {
      setTimeout(async () => {
        if (!NodeToSocketId.get(node_name)) {
          await NodeModel.updateMany({}, { $set: { state: false } });
          console.log("disconected");

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

const handleDripMotor = async (data, socket) => {
  const { state } = data;
  try {
    await NodeModel.updateOne(
      {
        name: "dripmotor",
      },
      { $set: { state: state } }
    );
    console.log(state);
    socket.broadcast.to("anmaya-iot").emit("dripmotor", { state });
  } catch (error) {
    console.log(error);
  }
};

const handleDripMotorAck = (data, socket) => {
  console.log("acknowledgement recieved");
  socket.broadcast.to("anmaya-iot").emit("dripmotor-ack", data);
};

const handleFogMotor = async (data, socket) => {
  const { state } = data;
  try {
    await NodeModel.updateOne(
      {
        name: "fogmotor",
      },
      { $set: { state: state } }
    );
    console.log(state);
    socket.broadcast.to("anmaya-iot").emit("fogmotor", { state });
  } catch (error) {
    console.log(error);
  }
};

const handleFogMotorAck = (data, socket) => {
  console.log("acknowledgement recieved");
  socket.broadcast.to("anmaya-iot").emit("fogmotor-ack", data);
};

const handleCoolerPadMotor = async (data, socket) => {
  const { state } = data;
  try {
    await NodeModel.updateOne(
      {
        name: "coolerpad-motor",
      },
      { $set: { state: state } }
    );
    console.log(state);
    socket.broadcast.to("anmaya-iot").emit("coolerpad-motor", { state });
  } catch (error) {
    console.log(error);
  }
};

const handleCoolerPadMotorAck = (data, socket) => {
  console.log("acknowledgement recieved");
  socket.broadcast.to("anmaya-iot").emit("motor1-ack", data);
};

const handleValve = async (data, socket) => {
  const { state } = data;
  try {
    await NodeModel.updateOne(
      {
        name: "valve",
      },
      { $set: { state: state } }
    );
    console.log(state);
    socket.broadcast.to("anmaya-iot").emit("valve", { state });
  } catch (error) {
    console.log(error);
  }
};

const handleValveAck = (data, socket) => {
  console.log("acknowledgement recieved");
  socket.broadcast.to("anmaya-iot").emit("valve-ack", data);
};

// const DeviceIdToSocketId = new Map();
// const SocketIdToDeviceId = new Map();

// const handleDisconnect = (socket) => {
//   const deviceId = SocketIdToDeviceId.get(socket.id);
//   SocketIdToDeviceId.delete(socket.id);
//   DeviceIdToSocketId.delete(deviceId);
//   console.log("disconnected");
// };

// const handleDeviceLogin = (data, socket) => {
//   const { device_id } = data;
//   console.log("device logged in");
//   DeviceIdToSocketId.set(device_id, socket.id);
//   SocketIdToDeviceId.set(socket.id, device_id);
//   socket.emit("device-login-success");
// };

// const handleNode = (data, socket, event) => {
//   console.log("handle node called");
// };

// const handleNodeAcknowledgement = (data, socket, event) => {
//   console.log("acknowledgement recieved");
// };

module.exports = {
  handleConnect,
  handleDisconnect,
  handleRoomJoin,
  handleDripMotor,
  handleDripMotorAck,
  handleFogMotor,
  handleFogMotorAck,
  handleCoolerPadMotor,
  handleCoolerPadMotorAck,
  handleValve,
  handleValveAck,
};
