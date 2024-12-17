import { useEffect, useReducer, useState } from "react";
import {
    getAllProducts,
    getLatestProducts,
    searchProducts,
} from "../api/productService";
import productReducer from "../reducers/productReducer";

export function useGetLatsetProducts(initalValue) {
    const [products, setProducts] = useState(initalValue);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const products = await getLatestProducts();
                setProducts(products);
                setIsLoading(false);
            } catch (err) {
                setIsError(true);
                setIsLoading(false);
            }
        })();
    }, []);

    return {
        products,
        isLoading,
        isError,
    };
}

export function useGetAllProducts(initalValue) {
    const [products, dispatch] = useReducer(productReducer, initalValue);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);

    function setProducts(products) {
        if (typeof(products)=== "object") {
            dispatch(products);
        }
    }

    function setLoading(value){
        if(typeof(value)==="boolean"){
            setIsLoading(value);
        }
    }

    function setError(value){
        if(typeof(value)==="boolean"){
            setIsError(value);
        }
    }

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const products = await getAllProducts();
                dispatch({ payload: products, type: "getAll" });
                setIsLoading(false);
            } catch (err) {
                setIsError(true);
                setIsLoading(false);
            }
        })();
    }, []);

    return {
        products,
        setProducts,
        isLoading,
        setLoading,
        isError,
        setError
    };
}

export function useSearchProducts() {
    return async function (query, criteria) {
        return await searchProducts(query, criteria);
    };
}
