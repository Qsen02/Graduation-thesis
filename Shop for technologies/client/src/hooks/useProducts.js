import { useEffect, useState } from "react";
import { getAllProducts, getLatestProducts } from "../api/productService";

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
                setIsLoading(false);
             }
          })()
     },[])

     return {
        products,isLoading,isError
     }
}

export function useGetAllProducts(initalValue){
   const [products,setProducts]=useState(initalValue);
   const [isLoading,setIsLoading]=useState(false);
   const [isError,setIsError]=useState(false);

   useEffect(()=>{
        (async()=>{
           try{
              setIsLoading(true);
              const products=await getAllProducts();
              setProducts(products);
              setIsLoading(false);
           }catch(err){
              setIsError(true);
              setIsLoading(false);
           }
        })()
   },[])

   return {
      products,isLoading,isError
   }
}