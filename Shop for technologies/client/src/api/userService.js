import { get, post, put } from "./requester";

const endpoint="/users";

export async function getUserById(userId){
   return await get(`${endpoint}/${userId}`);
}

export async function login(data){
    return await post(`${endpoint}/login`,data);
}

export async function register(data){
    return await post(`${endpoint}/register`,data);
}

export async function logout(){
    return await get(`${endpoint}/logout`);
}

export async function changePassword(userId,data){
    return await put(`${endpoint}/changePassword/${userId}`,data);
}

export async function editUser(userId,data){
    return await put(`${endpoint}/edit/${userId}`,data);
}

export async function clearCart(userId){
    return await put(`${endpoint}/clearBasket/${userId}`,{});
}