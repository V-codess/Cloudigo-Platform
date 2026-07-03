const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const PORT = process.env.PORT || 8080;
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("CLOUDIGO CONTROL PANEL")
})

app.listen(PORT, ()=>{
   console.log("Cloudigo server listening at port", PORT)
})