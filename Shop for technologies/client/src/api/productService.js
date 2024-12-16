import { del, get, post, put } from "./requester";

const endpoint = "/products";

export async function getLatestProducts() {
    return await get(`${endpoint}/latest`);
}

export async function getNextProducts(count) {
    return await get(`${endpoint}/page/${count}`);
}

export async function getProductById(productId){
    return await get(`${endpoint}/${productId}`);
}

export async function searchProducts(query,criteria){
    return await get(`${endpoint}/search/${query}/by/${criteria}`);
}

export async function createProduct(data){
    return await post(endpoint,data);
}

export async function deleteProduct(productId){
    await del(`${endpoint}/${productId}`);
}

export async function editProduct(productId,data){
    return await put(`${endpoint}/${productId}`,data);
}

export async function likeProduct(productId){
    return await post(`${endpoint}/like/${productId}`,{});
}

export async function unlikeProduct(productId){
    return await post(`${endpoint}/unlike/${productId}`,{});
}

export async function addProductToCart(productId){
    return await put(`${endpoint}/add/${productId}`,{});
}

export async function removeProductFromCart(productId){
    return await del(`${endpoint}/remove/${productId}`,{});
}