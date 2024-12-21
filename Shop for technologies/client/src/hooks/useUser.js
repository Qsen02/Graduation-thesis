import { useEffect, useState } from "react";
import { getUserById, login, logout, register } from "../api/userService";
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
const [totalPrice,setTotalPrice]=useState(0);

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const user = await getUserById(userId);
                setProducts(user.basket);
                let price=0;
                user.basket.forEach(el => price+=el.price);
                setTotalPrice(price);
                setIsLoading(false);
            } catch (err) {
                setIsError(true);
                setIsLoading(false);
            }
        })();
    }, []);

    return {
        products,isLoading,isError,totalPrice
    }
}
