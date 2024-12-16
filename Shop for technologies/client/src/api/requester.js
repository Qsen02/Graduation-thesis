import { getUserData, removeUserData } from "../utils/userHelper";

const host="http://localhost:3000"

async function request(method, url, data) {
    const options = {
        method: method,
        headers: {
            "Content-Type": "application/json",
        }
    };
    const userData = getUserData();
    if(userData){
        options.headers["X-Authorization"]=userData.accessToken;
    }
    if(data){
        options.body=JSON.stringify(data);
    }

    const res=await fetch(url,options);

    if(!res.ok){
        if(res.status===403){
            removeUserData();
        }
        const err=await res.json();
        throw new Error(err.message);
    }

    return await res.json();
}

export async function get(url){
    return await request("get",host+url);
}

export async function post(url,data){
    return await request("post",host+url,data);
}

export async function del(url){
    return await request("delete",host+url);
}

export async function put(url,data){
    return await request("put",host+url,data);
}


