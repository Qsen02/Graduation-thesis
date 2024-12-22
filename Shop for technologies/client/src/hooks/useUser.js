import { useEffect, useState } from "react";
import { clearCart, getUserById, login, logout, register } from "../api/userService";
import { useLoadingError } from "./useLoadingError";

export function useLogin() {
    return async function (data) {
        return await login(data);
    };
}

export function useRegister() {
    return async function (data) {
        return await register(data);
    };
}

export function useUserCart(initialValue, userId) {
    const [products, setProducts] = useState(initialValue);
    const { isLoading, setIsLoading, isError, setIsError } = useLoadingError(
        false,
        false
    );

    function setProductHandler(value){
        if(value instanceof Array){
            setProducts(value)
        }
    }

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const user = await getUserById(userId);
                setProducts(user.basket);
                setIsLoading(false);
            } catch (err) {
                setIsError(true);
                setIsLoading(false);
            }
        })();
    }, []);

    return {
        products,setProductHandler,isLoading,isError
    }
}

export function useClearUserCart(){
    return async function(userId){
        return await clearCart(userId);
    }
}
