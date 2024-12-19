import { useEffect, useReducer, useState } from "react";
import {
    createProduct,
    deleteProduct,
    getAllProducts,
    getLatestProducts,
    getProductById,
    searchProducts,
} from "../api/productService";
import productReducer from "../reducers/productReducer";
import { useNavigate } from "react-router-dom";

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
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [isAdded, setIsAdded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const product = await getProductById(productId);
                setProduct(product);
                const like = Boolean(
                    product.likes.find((el) => el._id == user._id)
                );
                setIsLiked(like);
                const added = Boolean(
                    user.basket.find((el) => el._id == product._id)
                );
                setIsAdded(added);
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
        isLoading,
        isError,
        isLiked,
        isAdded,
    };
}

export function useDeleteProduct(initalValue, productId) {
    const [product, setProduct] = useState(initalValue);
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            try {
                const product = await getProductById(productId);
                setProduct(product);
            } catch (err) {
                if (err.message == "Resource not found!") {
                    return navigate("/404");
                }
            }
        })();
    }, []);

    async function deleteThisProduct(productId) {
        return await deleteProduct(productId);
    };

    return {
        product,deleteThisProduct,navigate
    }
}
