const { Router } = require("express");
const { checkOrderId, getOrderById, buyProducts } = require("../services/order");
const { checkUserId, getUserById } = require("../services/user");
const { isUser } = require("../middlewares/guard");
const { orderEmail } = require("../services/mailer");

const orderRouter = Router();

orderRouter.post("/buy/:userId",isUser(), async(req, res) => {
    const userId = req.params.userId;
    const isValid = await checkUserId(userId);
    if (!isValid) {
        return res.status(404).json({ message: "Resource not found!" });
    }
    const user = await getUserById(userId).lean();
    const updatedUser=await buyProducts(user);
    const newOrder=updatedUser[1];
    const returnedUser=updatedUser[0];
    orderEmail(user.username,user.email, newOrder.totalPrice);
    res.json(returnedUser);
})

orderRouter.get("/:orderId", async(req, res) => {
    const orderId = req.params.orderId;
    const isValid = await checkOrderId(orderId);
    if (!isValid) {
        return res.status(404).json({ message: "Resource not found!" });
    }
    const order = await getOrderById(orderId).lean();
    res.json(order);
})

module.exports = {
    orderRouter
}