import { get, post } from "./requester";

const endpoint="/orders";

export async function buyProducts(userId){
    return await post(`${endpoint}/buy/${userId}`,{});
}

export async function getOrderById(orderId){
    return await get(`${endpoint}/${orderId}`);
}