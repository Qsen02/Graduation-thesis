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
const upload = require("../config/multer");
const fs = require("fs/promises");
const { checkFileExists } = require("../utils/files");
const { checkFileUpload } = require("../middlewares/fileErrorHandler");
const cloudinary = require("cloudinary").v2;

const productRouter = Router();

productRouter.get("/", async (req, res) => {
	const products = await getAllProducts().lean();
	res.json(products);
});

productRouter.get("/latest/:productCount", async (req, res) => {
	const productCount = Number(req.params.productCount);
	const product = await getLatestProducts(productCount).lean();
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
	if (!pageNumber && pageNumber != 0) {
		return res.status(400).json({ message: "This page isn't exist!" });
	}
	const data = await pagination(pageNumber);
	res.json(data);
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
	upload.single("imageUrl"),
	body("name").isLength({ min: 2 }),
	body("price").isInt({ min: 0 }),
	body("characteristics").matches(/^(?=.*[,])(?=.*[:])(?=.*\s).+$/),
	body("description").isLength({ min: 10, max: 300 }),
	body("category").isLength({ min: 1 }),
	async (req, res) => {
		const fields = req.body;
		const user = req.user;
		const imageUrl = req.file?.path;
		const image_id = req.file?.filename;
		if (imageUrl == undefined) {
			return res
				.status(400)
				.json({ message: "Снимката е задължителна!" });
		}
		try {
			const result = validationResult(req);
			if (result.errors.length) {
				throw new Error("Данните ти не са в правилен формат!");
			}
			const newProduct = await createProduct(
				fields,
				user,
				imageUrl,
				image_id
			);
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
	const deletedProduct = await deleteProduct(productId);
	const isImageExist = await checkFileExists(deletedProduct.image_id);
	if (isImageExist) {
		await cloudinary.uploader.destroy(deletedProduct.image_id);
	}
	res.status(200).json({ message: "Record was deleted successfully!" });
});

productRouter.put(
	"/:productId",
	isUser(),
	upload.single("imageUrl"),
	checkFileUpload(),
	body("name").isLength({ min: 2 }),
	body("price").isInt({ min: 0 }),
	body("characteristics").matches(/^(?=.*[,])(?=.*[:])(?=.*\s).+$/),
	body("description").isLength({ min: 10, max: 300 }),
	body("category").isLength({ min: 1 }),
	async (req, res) => {
		try {
			const productId = req.params.productId;
			const isValid = await checkProductId(productId);
			if (!isValid) {
				return res.status(404).json({ message: "Resource not found!" });
			}
			const fields = req.body;
			const imageUrl = req.file?.path;
			const image_id = req.file?.filename;
			const result = validationResult(req);
			if (result.errors.length) {
				throw new Error("Данните ти не са в правилен формат!");
			}
			const oldProduct = await getProductById(productId).lean();
			const isImageExist = await checkFileExists(oldProduct.image_id);
			if (isImageExist) {
				await cloudinary.uploader.destroy(oldProduct.image_id);
			}
			const product = await updateProduct(productId, fields, imageUrl, image_id);
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
	const updatedUser = await removeProductFromBasket(user._id, product);
	res.status(200).json({ basket: updatedUser.basket });
});

module.exports = {
	productRouter,
};
