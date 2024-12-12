const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    addess:{
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true,
        unique: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    basket: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Products",
        default: []
    },
    orderHistory: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Orders",
        default: []
    }
});

const Users = mongoose.model("Users", userSchema);

module.exports = {
    Users
}