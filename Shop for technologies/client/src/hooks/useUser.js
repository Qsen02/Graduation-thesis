import { login, register } from "../api/userService"

export function useLogin(){
    return async function(data){
        return await login(data);
    }
}

export function useRegister(){
    return async function(data){
        return await register(data);
    }
}