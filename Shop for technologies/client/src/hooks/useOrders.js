import { buyProducts } from "../api/orderService"

export function useBuyProducts(){
    return async function(userId){
        return await buyProducts(userId);
    }
}