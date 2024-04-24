const controller = require("../controller/socket");

module.exports = (socket) => {
  console.log("connected");
  socket.on("disconnect", () => controller.handleDisconnect(socket));
  socket.on("join-room", (data) => controller.handleRoomJoin(data, socket));
  socket.on("motor1", (data) => controller.handleMotor1(data, socket));
  socket.on("motor1-ack", (data) => controller.handleMotor1Ack(data, socket));
};
