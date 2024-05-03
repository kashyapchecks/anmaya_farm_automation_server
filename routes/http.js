const routes = require("express").Router();

routes.post("/create_farm", require("../controller/http/create_farm"));
routes.post("/create_device", require("../controller/http/create_device"));
routes.post("/create_node", require("../controller/http/create_node"));

routes.get("/farms", require("../controller/http/get_farms"));
routes.get("/devices", require("../controller/http/get_devices"));
routes.get("/nodes", require("../controller/http/get_nodes"));
routes.get("/device_data", require("../controller/http/get_device_data"));

module.exports = routes;
