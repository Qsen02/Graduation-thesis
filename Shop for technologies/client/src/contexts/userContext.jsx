import { createContext, useContext } from "react";
import { usePresistedState } from "../hooks/usePresistedState";
import { removeUserData } from "../utils/userHelper";
import { logout } from "../api/userService";

const UserContext = createContext();

export { UserContext };

export default function UserContextProvider(props) {
    const { user, setUserData } = usePresistedState(null);

    function setUserHanlder(user){
        setUserData(user);
    }

   async function clearUserHandler(){
        removeUserData();
        await logout();
        setUserData(null);
    }

    return (
        <UserContext.Provider value={{user,setUserHanlder,clearUserHandler}}>
            {props.children}
        </UserContext.Provider>
    );
}

export function useUserContext(){
    const {user,setUserHanlder,clearUserHandler}=useContext(UserContext);

    return {
        user,setUserHanlder,clearUserHandler
    }
}
