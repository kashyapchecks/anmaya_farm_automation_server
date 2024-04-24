const mongoose = require("mongoose");

const connectToDb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://AIET_SPP:Aietspp%403330@aietsppv1.cxun0bh.mongodb.net/farm?retryWrites=true&w=majority"
    );
    console.log("connected to mongodb");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectToDb;
