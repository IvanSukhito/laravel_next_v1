import { BASE_URL } from "@/constants/Urls";
import { CustomError } from "@/types/CustomError";
import BaseResponse from "@/types/responses/BaseResponse";
import Cookies from "js-cookie";


export type ApiFetchOptions = RequestInit & {
    redirecton401?: boolean;
}
const token = typeof window !== 'undefined' ? Cookies.get('authToken') : null;

export async function coreApiFetch<T>(
    endpoint: string,
    options: ApiFetchOptions
): Promise<BaseResponse<T>> {
    const response = await fetch(`${BASE_URL}${endpoint}`,{
        ...options,
        credentials: "same-origin",
        headers:{
            "Content-Type":"application/json",
            "Accept": "application/json", // TAMBAHKAN INI
            ...(token ? { "Authorization": `Bearer ${token}` } : {}),
            ...(options.headers || {}),
        },
    });

    if (response.status === 401){
        if(options.redirecton401){
            if(typeof window !== "undefined"){
                window.location.href = '/sign-in';
            }
            throw new CustomError("AUTH", "Request not found", null, 404);
        }
    }
    if (response.status === 404){
        throw new CustomError("Not Found", "Request not found", null, 404);
    }

    const resp: BaseResponse<T> = await response.json();

    if(!response.ok && resp.status === false){
        throw new CustomError("API", resp.message, resp.data);
    }

    return resp;
}

