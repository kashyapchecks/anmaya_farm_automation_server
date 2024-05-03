const controller = require("../controller/socket/socket");
const NodeModel = require("../model/node_model");

//server listening events array
let nodeEvents = [];

const socketHandler = (socket) => {
  controller.handleConnect(socket);

  // socket.on("disconnect", () => controller.handleDisconnect(socket));
  // socket.on("device-login", (data) =>
  //   controller.handleDeviceLogin(data, socket)
  // );
  // nodeEvents.forEach((event) => {
  //   console.log(event);
  //   socket.on(event, (data) => controller.handleNode(data, socket, event));
  //   socket.on(`${event}-ack`, (data) =>
  //     controller.handleNodeAcknowledgement(data, socket, `${event}-ack`)
  //   );
  // });

  //temporary events
  socket.on("room-join", (data) => controller.handleRoomJoin(data, socket));
  socket.on("disconnect", () => controller.handleDisconnect(socket));
  socket.on("dripmotor", (data) => controller.handleDripMotor(data, socket));
  socket.on("dripmotor-ack", (data) =>
    controller.handleDripMotorAck(data, socket)
  );
  socket.on("fogmotor", (data) => controller.handleFogMotor(data, socket));
  socket.on("fogmotor-ack", (data) =>
    controller.handleFogMotorAck(data, socket)
  );
  socket.on("coolerpad-motor", (data) =>
    controller.handleCoolerPadMotor(data, socket)
  );
  socket.on("coolerpad-motor-ack", (data) =>
    controller.handleCoolerPadMotorAck(data, socket)
  );
  socket.on("valve", (data) => controller.handleValve(data, socket));
  socket.on("valve-ack", (data) => controller.handleValveAck(data, socket));
};

const nodeEventsUpdater = async () => {
  console.log("updating events....");
  const tempNodeEvents = [];
  const result = await NodeModel.find({}, { event: 1, _id: 0 });
  result.forEach((node) => {
    tempNodeEvents.push(node.event);
  });

  nodeEvents = tempNodeEvents;

  console.log("events updated...");
};

//updatig the node events array when server restarts
nodeEventsUpdater();

module.exports = { socketHandler, nodeEventsUpdater };
