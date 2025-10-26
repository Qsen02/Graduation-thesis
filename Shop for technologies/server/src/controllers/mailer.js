const {Router}=require("express");
const { checkOrderId } = require("../services/order");

const mailRouter=Router();

mailRouter.post("/register", (req, res) => {
    const user=req.user;
    try {
        registrationEmail(user.username,user.email);
        return res.status(200).json({ message: "Registration email sent successfully!" });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

mailRouter.post("/order/:orderId", async (req, res) => {
    const { orderId } = req.params;
    const user=req.user;
    const isValid=checkOrderId(orderId);
    if(!isValid){
        return  res.status(400).json({ message: "Resource not found!" });
    }
    try {
        const order=await getOrderById(orderId);
        orderEmail(user.username,user.email,order.totalPrice);
        return res.status(200).json({ message: "Order email sent successfully!" });
    } catch (error) {
        return res.status(400).json({ message: error.message });
    }
});

module.exports={mailRouter};