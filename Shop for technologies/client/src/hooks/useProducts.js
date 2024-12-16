import { useEffect, useState } from "react";
import { getLatestProducts } from "../api/productService";

export function useGetLatsetProducts(initalValue){
     const [products,setProducts]=useState(initalValue);
     const [isLoading,setIsLoading]=useState(false);
     const [isError,setIsError]=useState(false);

     useEffect(()=>{
          (async()=>{
             try{
                setIsLoading(true);
                const products=await getLatestProducts();
                setProducts(products);
                setIsLoading(false);
             }catch(err){
                setIsError(true);
             }
          })()
     },[])

     return {
        products,isLoading,isError
     }
}