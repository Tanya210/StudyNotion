const mongoose = require("mongoose");

const DBConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected successfully");
  } catch (e) {
    console.log("Database connection failed");
    console.log(e);
    process.exit(1);
  }
};

module.exports = DBConnect;
