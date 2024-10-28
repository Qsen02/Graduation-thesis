const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    characteristics: {
        type: [Object],
        require: true
    },
    description: {
        type: String,
        require: true
    },
    imageUrl: {
        type: String,
        require: true
    },
    category: {
        type: String,
        enum: ["Computers", "Laptops", "Phones", "Keyboards and mouses", "Speakers and headphones",
            "Stoves", "Washing machines", "TV", "Air conditioners", "Others"
        ],
        require: true
    },
    ownerId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Users"
    },
    likes: {
        type: [mongoose.SchemaTypes.ObjectId],
        ref: "Users",
        default: []
    }
});

const Products = mongoose.model("Products", productSchema);

module.exports = {
    Products
}