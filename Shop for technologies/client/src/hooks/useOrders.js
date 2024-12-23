import { useEffect, useState } from "react";
import { buyProducts, getOrderById } from "../api/orderService";
import { useLoadingError } from "./useLoadingError";
import { useNavigate } from "react-router-dom";

export function useBuyProducts() {
    return async function (userId) {
        return await buyProducts(userId);
    };
}

export function useGetOneOrder(initlValue, orderId) {
    const [order, setOdrer] = useState(initlValue);
    const { isLoading, setIsLoading, isError, setIsError } = useLoadingError(
        false,
        false
    );
    const navigate=useNavigate();

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const order = await getOrderById(orderId);
                setOdrer(order);
                setIsLoading(false);
            } catch (err) {
                if (err.message == "Resource not found!") {
                    return navigate("/404");
                }
                setIsError(true);
                setIsLoading(false);
            }
        })();
    }, []);

    return {
        order,isLoading,isError,navigate
    }
}
