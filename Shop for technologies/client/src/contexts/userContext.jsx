import { createContext, useContext } from "react";
import { usePresistedState } from "../hooks/usePresistedState";
import { removeUserData, setUserData } from "../utils/userHelper";
import { logout } from "../api/userService";

const UserContext = createContext();

export { UserContext };

export default function UserContextProvider(props) {
    const { user, setCurUser } = usePresistedState(null);

    function setUserHanlder(user) {
        setCurUser(user);
        setUserData(user);
    }

    async function clearUserHandler() {
        await logout();
        removeUserData();
        setCurUser(null);
    }

    return (
        <UserContext.Provider
            value={{ user, setUserHanlder, clearUserHandler }}
        >
            {props.children}
        </UserContext.Provider>
    );
}

export function useUserContext() {
    const { user, setUserHanlder, clearUserHandler } = useContext(UserContext);

    return {
        user,
        setUserHanlder,
        clearUserHandler,
    };
}
