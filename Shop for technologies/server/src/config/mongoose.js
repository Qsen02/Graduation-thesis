const mongoose = require("mongoose");
const User = require("../models/user.js");
const Products = require("../models/Product.js");
const Orders = require("../models/Order.js");

const localDB = "mongodb://localhost:27017/Shop-for-technologies";

async function runDB() {
    mongoose.connect(localDB);
    console.log("Database is running");
}

module.exports = {
    runDB
}