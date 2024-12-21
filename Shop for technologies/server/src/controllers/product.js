const { Router } = require("express");
const {
    getAllProducts,
    checkProductId,
    getProductById,
    pagination,
    searchProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    likeProduct,
    unlikeProduct,
    addProductToBasket,
    removeProductFromBasket,
    getLatestProducts,
} = require("../services/product");
const { isUser } = require("../middlewares/guard");
const { body, validationResult } = require("express-validator");

const productRouter = Router();

productRouter.get("/", async (req, res) => {
    const products = await getAllProducts().lean();
    res.json(products);
});

productRouter.get("/latest", async (req, res) => {
    const product = await getLatestProducts().lean();
    res.json(product);
});

productRouter.get("/:productId", async (req, res) => {
    const productId = req.params.productId;
    const isValid = await checkProductId(productId);
    if (!isValid) {
        return res.status(404).json({ message: "Resource not found!" });
    }
    const product = await getProductById(productId).lean();
    res.json(product);
});

productRouter.get("/page/:pageNumber", async (req, res) => {
    const pageNumber = Number(req.params.pageNumber);
    if (!pageNumber) {
        return res.status(400).json({ message: "This page isn't exist!" });
    }
    const products = await pagination(pageNumber).lean();
    res.json(products);
});

productRouter.get("/search/:query/by/:criteria", async (req, res) => {
    let query = req.params.query;
    const criteria = req.params.criteria;
    if (!criteria) {
        res.status(400).json({
            message: "Your request must contain search criteria!",
        });
    }
    if (query == "No value") {
        query = "";
    }
    const products = await searchProducts(query, criteria);
    res.json(products);
});

productRouter.post(
    "/",
    isUser(),
    body("name").isLength({ min: 2 }),
    body("price").isNumeric({ min: 0 }),
    body("characteristics").matches(/^(?=.*[,])(?=.*[:])(?=.*\s).+$/),
    body("description").isLength({ min: 10, max: 300 }),
    body("imageUrl").matches(/^https?:\/\//),
    body("category").isLength({ min: 1 }),
    async (req, res) => {
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
    }
);

productRouter.delete("/:productId", isUser(), async (req, res) => {
    const productId = req.params.productId;
    const isValid = await checkProductId(productId);
    if (!isValid) {
        return res.status(404).json({ message: "Resource not found!" });
    }
    await deleteProduct(productId);
    res.status(200).json({ message: "Record was deleted successfully!" });
});

productRouter.put(
    "/:productId",
    isUser(),
    body("name").isLength({ min: 2 }),
    body("price").isNumeric({ min: 0 }),
    body("characteristics").matches(/^(?=.*[,])(?=.*[:])(?=.*\s).+$/),
    body("description").isLength({ min: 10, max: 300 }),
    body("imageUrl").matches(/^https?:\/\//),
    body("category").isLength({ min: 1 }),
    async (req, res) => {
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
            const product = await updateProduct(productId, fields);
            res.status(200).json(product);
        } catch (err) {
            return res.status(400).json({ message: err.message });
        }
    }
);

productRouter.post("/like/:productId", isUser(), async (req, res) => {
    const productId = req.params.productId;
    const isValid = await checkProductId(productId);
    const user = req.user;
    if (!isValid) {
        return res.status(404).json({ message: "Resource not found!" });
    }
    const product = await likeProduct(user, productId);
    res.status(200).json(product);
});

productRouter.post("/unlike/:productId", isUser(), async (req, res) => {
    const productId = req.params.productId;
    const isValid = await checkProductId(productId);
    const user = req.user;
    if (!isValid) {
        return res.status(404).json({ message: "Resource not found!" });
    }
    const product = await unlikeProduct(user, productId);
    res.status(200).json(product);
});

productRouter.put("/add/:productId", isUser(), async (req, res) => {
    const productId = req.params.productId;
    const isValid = await checkProductId(productId);
    const user = req.user;
    if (!isValid) {
        return res.status(404).json({ message: "Resource not found!" });
    }
    const product = await getProductById(productId).lean();
    await addProductToBasket(user._id, product);
    res.status(200).json(product);
});

productRouter.delete("/remove/:productId", isUser(), async (req, res) => {
    const productId = req.params.productId;
    const isValid = await checkProductId(productId);
    const user = req.user;
    if (!isValid) {
        return res.status(404).json({ message: "Resource not found!" });
    }
    const product = await getProductById(productId).lean();
    const updatedUser=await removeProductFromBasket(user._id, product);
    res.status(200).json({basket:updatedUser.basket});
});

module.exports = {
    productRouter,
};
