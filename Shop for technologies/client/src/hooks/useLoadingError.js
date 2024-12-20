import { useState } from "react";

export function useLoadingError(initialLoad, initialError) {
    const [isLoading, setLoading] = useState(initialLoad);
    const [isError, seError] = useState(initialError);

    function setIsLoading(value) {
        if (typeof value === "boolean") {
            setLoading(value);
        }
    }

    function setIsError(value) {
        if (typeof value === "boolean") {
            seError(value);
        }
    }

    return {
        isLoading,setIsLoading,isError,setIsError
    }
}