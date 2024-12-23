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
},{ timestamps: { createdAt: "created_at" } });

const Orders = mongoose.model("Orders", orderSchema);

module.exports = {
    Orders
}