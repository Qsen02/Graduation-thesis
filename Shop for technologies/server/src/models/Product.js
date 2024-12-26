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
        type: [String],
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
        enum: ["Компютри", "Лаптопи", "Телефони", "Мишки и клавиатури", "Тонколони и слушалки","Електроуреди","Други"
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