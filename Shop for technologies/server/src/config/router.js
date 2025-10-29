const { userRouter } = require("../controllers/user");
const { productRouter } = require("../controllers/product");
const { orderRouter } = require("../controllers/order");
const { mailRouter } = require("../controllers/mailer");
const express = require("express");
const path = require("path");

function routerConfig(app) {
    app.use("/users", userRouter);

    app.use("/products", productRouter);

    app.use("/orders", orderRouter);

    app.use("/mail", mailRouter);

    app.use("/images",express.static(path.join(__dirname,"../../images")));

    app.use("*", (req, res) => {
        return res.status(404).json({ message: "Resource not found!" });
    })
}

module.exports = {
    routerConfig
}