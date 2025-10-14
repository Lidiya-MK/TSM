const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Yaay! MongoDB Connected");
  } catch (err) {
    console.error("Oops! database connection failed:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
