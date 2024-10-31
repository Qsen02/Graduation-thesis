const { Router } = require("express");
const { getAllProducts, checkProductId, getProductById, pagination, searchProducts, createProduct, updateProduct, deleteProduct, likeProduct, unlikeProduct, addProductToBasket, removeProductFromBasket } = require("../services/product");
const { isUser } = require("../middlewares/guard");
const { body, validationResult } = require("express-validator");

const productRouter = Router();

productRouter.get("/", async(req, res) => {
    const products = await getAllProducts().lean();
    res.json(products);
})

productRouter.get("/:productId", async(req, res) => {
    const productId = req.params.productId;
    const isValid = await checkProductId(productId);
    if (!isValid) {
        return res.status(404).json({ message: "Resource not found!" });
    }
    const product = await getProductById(productId).lean();
    res.json(product);
})

productRouter.get("/page/:pageNumber", async(req, res) => {
    const pageNumber = Number(req.params.pageNumber);
    if (!pageNumber) {
        return res.status(400).json({ message: "This page isn't exist!" });
    }
    const products = await pagination(pageNumber).lean();
    res.json(products);
})

productRouter.get("/search/:query/by/:criteria", async(req, res) => {
    const query = req.params.query;
    const criteria = req.params.criteria;
    if (!criteria) {
        res.status(400).json({ message: "Your request must contain search criteria!" });
    }
    const products = await searchProducts(query, criteria).lean();
    res.json(products);
})

productRouter.post("/", isUser(),
    body("name").isLength({ min: 2 }),
    body("price").isNumeric({ min: 0 }),
    body("characteristics").matches(/^(?=.*[,])(?=.*[:])(?=.*\s).+$/),
    body("description").isLength({ min: 10, max: 300 }),
    body("imageUrl").matches(/^https?:\/\//),
    body("category").isLength({ min: 1 }),
    async(req, res) => {
        const fields = req.body;
        const user = req.user;
        try {
            const result = validationResult(req);
            if (result.errors.length) {
                throw new Error("Your data is not in valid format!");
            }
            const newProduct = await createProduct(fields, user);
            res.json(newProduct);
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    })

productRouter.put("/:productId", isUser(),
    body("name").isLength({ min: 2 }),
    body("price").isNumeric({ min: 0 }),
    body("characteristics").matches(/^(?=.*[,])(?=.*[:])(?=.*\s).+$/),
    body("description").isLength({ min: 10, max: 300 }),
    body("imageUrl").matches(/^https?:\/\//),
    body("category").isLength({ min: 1 }),
    async(req, res) => {
        const productId = req.params.productId;
        const isValid = await checkProductId(productId);
        if (!isValid) {
            return res.status(404).json({ message: "Resource not found!" });
        }
        const fields = req.body;
        try {
            const result = validationResult(req);
            if (result.errors.length) {
                throw new Error("Your data is not in valid format!");
            }
            await updateProduct(productId, fields);
            res.status(200).json({ message: "Record was updated successfully!" });
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    })

productRouter.delete("/:productId", async(req, res) => {
    const productId = req.params.productId;
    const isValid = await checkProductId(productId);
    if (!isValid) {
        return res.status(404).json({ message: "Resource not found!" });
    }
    await deleteProduct(productId);
    res.status(200).json({ message: "Record was deleted successfully!" });
})

productRouter.post("/like/:productId", async(req, res) => {
    const productId = req.params.productId;
    const isValid = await checkProductId(productId);
    const user = req.user;
    if (!isValid) {
        return res.status(404).json({ message: "Resource not found!" });
    }
    await likeProduct(user, productId);
    res.status(200).json({ message: "Record was liked successfully!" });
})

productRouter.post("/unlike/:productId", async(req, res) => {
    const productId = req.params.productId;
    const isValid = await checkProductId(productId);
    const user = req.user;
    if (!isValid) {
        return res.status(404).json({ message: "Resource not found!" });
    }
    await unlikeProduct(user, productId);
    res.status(200).json({ message: "Record was unliked successfully!" });
})

productRouter.put("/add/:productId", async(req, res) => {
    const productId = req.params.productId;
    const isValid = await checkProductId(productId);
    const user = req.user;
    if (!isValid) {
        return res.status(404).json({ message: "Resource not found!" });
    }
    const product = await getProductById(productId).lean();
    await addProductToBasket(user._id, product);
    res.status(200).json({ message: "Record was added to user bakset successfully!" });
})

productRouter.delete("/remove/:productId", async(req, res) => {
    const productId = req.params.productId;
    const isValid = await checkProductId(productId);
    const user = req.user;
    if (!isValid) {
        return res.status(404).json({ message: "Resource not found!" });
    }
    const product = await getProductById(productId).lean();
    await removeProductFromBasket(user._id, product);
    res.status(200).json({ message: "Record was removed from user bakset successfully!" });
})

module.exports = {
    productRouter
}