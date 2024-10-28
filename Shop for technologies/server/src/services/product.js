const { Products } = require("../models/Product");
const { Users } = require("../models/user");

function getAllProducts() {
    const products = Products.find();
    return products;
}

function getProductById(productId) {
    const product = Products.findById(productId);
    return product;
}

function searchProducts(query, criteria) {
    let results = null;
    if (criteria == "name") {
        results = Products.find({ name: new RegExp(query, "i") });
    } else if (criteria == "price") {
        results = Products.find({ price: Number(query) });
    } else if (criteria = "category") {
        results = Products.find({ category: new RegExp(query, "i") });
    }
    return results;
}

function pagination(page) {
    const skipCount = 6 * page;
    const products = Products.find().limit(6).skip(skipCount);
    return products;
}

async function createProduct(product, user) {
    const newProduct = new Products(product);
    newProduct.ownerId = user._id;
    await newProduct.save();
    return newProduct;
}

async function updateProduct(productId, data) {
    await Products.findByIdAndUpdate(productId, { $set: { data } });
}

async function deleteProduct(productId) {
    await Products.findByIdAndDelete(productId);
}

async function likeProduct(user, productId) {
    await Products.findByIdAndUpdate(productId, { $push: { likes: user._id } });
}

async function unlikeProduct(user, productId) {
    await Products.findByIdAndUpdate(productId, { $pull: { likes: user._id } });
}

async function addProductToBasket(userId, product) {
    await Users.findByIdAndUpdate(userId, { $push: { basket: product._id } });
}
async function removeProductFromBasket(userId, product) {
    await Users.findByIdAndUpdate(userId, { $pull: { basket: product._id } });
}
async function clearBasket(userId) {
    await Users.findByIdAndUpdate(userId, { $set: { basket: [] } });
}

async function checkProductId(productId) {
    const products = await Products.find().lean();
    const isValid = products.find(el => el._id.toString() == productId);
    if (isValid) {
        return true;
    }
    return false;
}

module.exports = {
    getAllProducts,
    getProductById,
    searchProducts,
    pagination,
    checkProductId,
    clearBasket,
    removeProductFromBasket,
    addProductToBasket,
    createProduct,
    deleteProduct,
    updateProduct,
    likeProduct,
    unlikeProduct
}