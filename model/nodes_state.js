const mongoose = require("mongoose");

const NodesStateSchema = new mongoose.Schema({
  node_name: { type: String, required: true },
  node_state: { type: Boolean, default: false },
});

module.exports = mongoose.model("nodes", NodesStateSchema);
