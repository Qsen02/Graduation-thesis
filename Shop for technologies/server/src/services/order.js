const { Orders } = require("../models/Order");
const { Users } = require("../models/user");

function getOrderById(orderId) {
    const order = Orders.findById(orderId);
    return order;
}

async function buyProducts(user) {
    const userBasket = user.basket;
    let orderPrice = 0;
    for (let product of userBasket) {
        orderPrice += Number(product.price);
    }
    const newOrder = new Orders({
        ownerId: user._id,
        products: userBasket,
        totalPrice: orderPrice
    });
    await newOrder.save();
    await Users.findByIdAndUpdate(user._id.toString(), { $push: { orderHistory: newOrder } });
}

module.exports = {
    getOrderById,
    buyProducts
}