const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const databaseConnection = require("./config/connectDB");

dotenv.config();

const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("CLOUDIGO CONTROL PANEL");
});

// starting the server

const startServer = async() => {
    try {
        await databaseConnection();
        app.listen(PORT, ()=> console.log(`Server is running at ${PORT}`))
    } catch (error) {
        console.log("Unable to connect",error)
    }
}

startServer()
