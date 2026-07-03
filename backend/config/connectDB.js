const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const url = process.env.URL || "";
    if (!url) {
      throw new Error("URL is not defined in .env");
    }
    await mongoose.connect(url);
    console.log("Database connected");
  } catch (err) {
    console.log("DB connection error:", err.message);
  }
};

module.exports = connectDB;