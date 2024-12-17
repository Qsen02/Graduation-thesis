import { useState } from "react";
import { getUserData } from "../utils/userHelper";

export function usePresistedState(initalValue) {
    const [user, setUser] = useState(() => {
        const userData = getUserData();
        if (!userData) {
            return typeof initalValue === "function"
                ? initalValue()
                : initalValue;
        }

        return userData;
    });

    function setUserData(value) {
        const newState = typeof value === "function" ? value(user) : value;
        setUser(newState);
    }

    return {
        user,
        setUserData,
    };
}
