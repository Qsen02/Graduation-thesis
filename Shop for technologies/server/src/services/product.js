const { Products } = require("../models/Product");
const { Users } = require("../models/user");

function parseCharacteristics(charcateristicsStr) {
    const characteristics = charcateristicsStr.split(",");
    return characteristics;
}

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
    } else if ((criteria = "category")) {
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
    const characteristics = parseCharacteristics(product.characteristics);
    const newProduct = new Products({
        name: product.name,
        description: product.description,
        price: product.price,
        characteristics: characteristics,
        imageUrl: product.imageUrl,
        category: product.category,
    });
    newProduct.ownerId = user._id;
    await newProduct.save();
    return newProduct;
}

async function updateProduct(productId, data) {
    const characteristics = parseCharacteristics(data.characteristics);
    data.characteristics = characteristics;
    return await Products.findByIdAndUpdate(
        productId,
        { $set: data },
        { new: true }
    ).lean();
}

async function deleteProduct(productId) {
    await Products.findByIdAndDelete(productId);
}

async function likeProduct(user, productId) {
    return await Products.findByIdAndUpdate(
        productId,
        { $push: { likes: user._id } },
        { new: true }
    ).lean();
}

async function unlikeProduct(user, productId) {
    return await Products.findByIdAndUpdate(
        productId,
        { $pull: { likes: user._id } },
        { new: true }
    ).lean();
}

async function addProductToBasket(userId, product) {
    return await Users.findByIdAndUpdate(
        userId,
        { $push: { basket: product._id } },
        { new: true }
    ).lean();
}
async function removeProductFromBasket(userId, product) {
    await Users.findByIdAndUpdate(userId, { $pull: { basket: product._id } });
}

async function checkProductId(productId) {
    const products = await Products.find().lean();
    const isValid = products.find((el) => el._id.toString() == productId);
    if (isValid) {
        return true;
    }
    return false;
}

function getLatestProducts(){
    const products=Products.find().sort({$natural:-1}).limit(6);
    return products;
}

module.exports = {
    getAllProducts,
    getProductById,
    searchProducts,
    pagination,
    checkProductId,
    removeProductFromBasket,
    addProductToBasket,
    createProduct,
    deleteProduct,
    updateProduct,
    likeProduct,
    unlikeProduct,
    getLatestProducts
};
