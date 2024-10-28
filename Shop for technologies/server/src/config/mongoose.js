const mongoose = require("mongoose");

const localDB = "mongodb://localhost:27017/Shop-for-technologies";

async function runDB() {
    mongoose.connect(localDB);
    console.log("Database is running");
}

module.exports = {
    runDB
}