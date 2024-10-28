const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    ownerId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Users"
    },
    products: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Products",
        default: []
    },
    totalPrice: {
        type: Number,
        require: true
    }
});

const Orders = mongoose.model("Orders", orderSchema);

module.exports = {
    Orders
}