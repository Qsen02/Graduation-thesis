import { useEffect, useState } from "react";
import {
    changePassword,
    clearCart,
    editUser,
    getAdminProducts,
    getUserById,
    login,
    register,
} from "../api/userService";
import { useLoadingError } from "./useLoadingError";
import { useNavigate } from "react-router-dom";

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

    function setProductHandler(value) {
        if (value instanceof Array) {
            setProducts(value);
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
        products,
        setProductHandler,
        isLoading,
        isError,
    };
}

export function useClearUserCart() {
    return async function (userId) {
        return await clearCart(userId);
    };
}

export function useGetOneUser(initialValue, userId) {
    const [profileUser, setProfileUser] = useState(initialValue);
    const [adminProducts, setAdminProducts] = useState(null);
    const [isAdmin,setIsAdmin]=useState(false);
    const { isLoading, setIsLoading, isError, setIsError } = useLoadingError(
        false,
        false
    );
    const navigate=useNavigate();

    function setUserOnProfile(value){
        if(typeof(value)==="object"){
            setProfileUser(value);
        }
    }

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true);
                const user = await getUserById(userId);
                setProfileUser(user);
                if (user.isAdmin) {
                    setIsAdmin(true);
                    const products = await getAdminProducts();
                    setAdminProducts(products);
                }
                setIsLoading(false);
            } catch (err) {
                if(err.message=="Resource not found!"){
                    return navigate("/404");
                }
                setIsError(true);
                setIsLoading(false);
            }
        })();
    }, []);

    return {
        profileUser,
        setUserOnProfile,
        adminProducts,
        isLoading,
        isError,
        isAdmin
    };
}

export function useEditUser(){
    return async function(userId,data){
        return await editUser(userId,data);
    }
}

export function useChangePassword(){
    return async function (userId,data){
        return await changePassword(userId,data);
    }
}
