require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");
const {config }= require("./config");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", express.static("public"));
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(cors());   


// Database
const connectDB = require("./config/database");
connectDB();

// Routes
const router = require("./routes/route");
app.use("/", router);


app.listen(config.PORT , () => console.log("Bot WhatsApp en ligne sur port " + config.PORT + " 🚀"));
