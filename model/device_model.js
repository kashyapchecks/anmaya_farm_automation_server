const mongoose = require("mongoose");

const DeviceSchema = new mongoose.Schema({
  device_name: { type: String, required: true, unique: true },
  farm_id: { type: String, required: true },
  connected_nodes: { type: Array, required: false, default: [] },
  available_node_pins: {
    type: Array,
    required: false,
    default: [2, 3, 4, 17, 27, 22],
  },
  available_node_manual_control_pins: {
    type: Array,
    required: false,
    default: [10, 11, 12, 13],
  },
  power_consumption: { type: Number, required: false, default: 0 },
});

module.exports = mongoose.model("devices", DeviceSchema);
