import { useEffect, useReducer, useState } from "react";
import {
    addProductToCart,
    createProduct,
    deleteProduct,
    editProduct,
    getAllProducts,
    getLatestProducts,
    getProductById,
    likeProduct,
    removeProductFromCart,
    searchProducts,
    unlikeProduct,
} from "../api/productService";
import productReducer from "../reducers/productReducer";
import { useNavigate } from "react-router-dom";
import { useLoadingError } from "./useLoadingError";

export function useGetLatsetProducts(initalValue) {
    const [products, setProducts] = useState(initalValue);
    const {isLoading,setIsLoading,isError,setIsError}=useLoadingError(false,false);

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
    const {isLoading,setIsLoading,isError,setIsError}=useLoadingError(false,false);

    function setProducts(products) {
        if (typeof products === "object") {
            dispatch(products);
        }
    }

    function setLoading(value) {
        if (typeof value === "boolean") {
            setIsLoading(value);
        }
    }

    function setError(value) {
        if (typeof value === "boolean") {
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
        setError,
    };
}

export function useSearchProducts() {
    return async function (query, criteria) {
        return await searchProducts(query, criteria);
    };
}

export function useCreateProduct() {
    return async function (data) {
        return await createProduct(data);
    };
}

export function useGetOneProduct(initalValue, productId, user) {
    const [product, setProduct] = useState(initalValue);
    const {isLoading,setIsLoading,isError,setIsError}=useLoadingError(false,false);
    const navigate = useNavigate();

    function setCurProduct(value){
        if(typeof(value)==="object"){
            setProduct(value);
        }
    }

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const product = await getProductById(productId);
                setProduct(product);
                setIsLoading(false);
            } catch (err) {
                if (err.message == "Resource not found!") {
                    return navigate("/404");
                }
                setIsError(true);
                setIsLoading(false);
            }
        })();
    }, [productId]);

    return {
        product,
        setCurProduct,
        isLoading,
        isError,
    };
}

export function useDeleteProduct(initalValue, productId) {
    const [product, setProduct] = useState(initalValue);
    const {isLoading,setIsLoading,isError,setIsError}=useLoadingError(false,false);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const product = await getProductById(productId);
                setProduct(product);
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

    async function deleteThisProduct(productId) {
        return await deleteProduct(productId);
    }

    return {
        product,
        deleteThisProduct,
        navigate,
        isLoading,
        isError
    };
}

export function useEditProduct() {
    async function editThistProduct(productId,data) {
        return await editProduct(productId,data);
    }

    return editThistProduct;
}

export function useLikeProduct(){
    return async function(productId){
        return await likeProduct(productId);
    }
}

export function useUnlikeProduct(){
    return async function(productId){
        return await unlikeProduct(productId);
    }
}

export function useAddToCart(){
    return async function(productId){
        return await addProductToCart(productId);
    }
}

export function useRemoveProductFromCart(){
    return async function(productId){
        return await removeProductFromCart(productId);
    }
}