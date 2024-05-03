const FarmModel = require("../../model/farm_model");
const createFarm = async (req, res) => {
  try {
    const { name } = req.body;
    console.log(name);
    const farms = await FarmModel.find({ farm_name: name });
    if (farms.length) {
      res.status(400).json({ message: "farm already exists" });
      return;
    }
    await FarmModel({ farm_name: name }).save();
    res.status(201).json({ message: "farm created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "internal server error" });
  }
};

module.exports = createFarm;
