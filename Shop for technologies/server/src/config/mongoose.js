const mongoose = require("mongoose");
const User = require("../models/user.js");
const Products = require("../models/Product.js");
const Orders = require("../models/Order.js");

const localDB = "mongodb://127.0.0.1:27017/Shop-for-technologies";

async function runDB() {
    mongoose.connect(localDB, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("Database is running");
}

module.exports = {
    runDB
}