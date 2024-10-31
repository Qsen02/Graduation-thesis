const { userRouter } = require("../controllers/user");
const { productRouter } = require("../controllers/product");

function routerConfig(app) {
    app.use("/users", userRouter);

    app.use("/products", productRouter);

    app.use("*", (req, res) => {
        return res.status(404).json({ message: "Resource not found!" });
    })
}

module.exports = {
    routerConfig
}