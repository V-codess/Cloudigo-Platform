const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let memoryServer;

const connectDB = async () => {
  const uri = process.env.URL;

  if (uri) {
    await mongoose.connect(uri);
    console.log("Connected to MongoDB");
    return;
  }

  memoryServer = await MongoMemoryServer.create();
  await mongoose.connect(memoryServer.getUri());
  console.log("Connected to in-memory MongoDB");
};

module.exports = connectDB;
