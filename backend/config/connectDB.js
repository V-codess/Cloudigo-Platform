const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const connectDB = async () => {
  try {
    const url = process.env.URL || "";
    if (!url) {
      const mongoServer = await MongoMemoryServer.create();
      const memoryUri = mongoServer.getUri();
      await mongoose.connect(memoryUri);
      console.log("Connected to in-memory MongoDB");
    } 
    await mongoose.connect(url);
    console.log("Database connected");
  } catch (err) {
    console.log("DB connection error:", err.message);
  }
};

module.exports = connectDB;
