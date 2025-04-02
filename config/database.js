const mongoose = require("mongoose");
const { config } = require("../config");

const connectDB = async () => {
    try {
        await mongoose.connect(config.MONGO_URI);
        console.log("Database connected");
    } catch (error) {
        console.log(error);
    }
};

module.exports = connectDB;