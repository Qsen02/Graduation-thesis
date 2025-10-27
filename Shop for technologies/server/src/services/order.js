const { Orders } = require("../models/Order");
const { Users } = require("../models/user");

function getOrderById(orderId) {
    const order = Orders.findById(orderId).populate("products");
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
        totalPrice: orderPrice,
    });
    await newOrder.save();
    await Users.findByIdAndUpdate(user._id.toString(), {
        $push: { orderHistory: newOrder },
    });
    return [await Users.findByIdAndUpdate(
        user._id.toString(),
        { $set: { basket: [] } },
        { new: true }
    ), newOrder];
}

async function checkOrderId(orderId) {
    const orders = await Orders.find().lean();
    const isValid = orders.find((el) => el._id.toString() == orderId);
    if (isValid) {
        return true;
    }
    return false;
}

module.exports = {
    getOrderById,
    buyProducts,
    checkOrderId,
};
