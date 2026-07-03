const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const connectDB = async () => {
  try {
    const url = process.env.URL || "";
    if (!url) {
      const memoryServer = await MongoMemoryServer.create();
      mongoUri = memoryServer.getUri();
      console.log("Using in-memory MongoDB");
    }
    await mongoose.connect(url);
    console.log("Database connected");
  } catch (err) {
    console.log("DB connection error:", err.message);
  }
};

module.exports = connectDB;