import { login } from "../api/userService"

export function useLogin(){
    return async function(data){
        return await login(data);
    }
}