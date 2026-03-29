import { WrapWithCustomError } from "@/lib/CustomErrorWrapper";
import LoginRequest from "@/types/request/auth/login/LoginRequest";
import LoginResponse from "@/types/responses/auth/login/LoginResponse";
import { ApiFetch, ApiFetchSecured } from "../ApiFetch";
import { LOGIN_URL, LOGOUT_URL, REGISTER_URL } from "@/constants/Urls";
import BaseResponse from "@/types/responses/BaseResponse";
import RegisterRequest from "@/types/request/auth/register/RegisterRequest";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

    export const postLogin = (data: LoginRequest): Promise <LoginResponse> => 
        WrapWithCustomError(async () => {
            const res = await ApiFetch<LoginResponse>(LOGIN_URL, {
                method: "POST",
                body: JSON.stringify(data),
            });

            if (!res.data){
                throw new Error("Null data response");
            }

            const token = res.data._token;
            console.log("tokenn", res.data._token);
            console.log("frontend",res.data);

            if (!res.data || !res.data) { // Pastikan backend kirim 'token'
            throw new Error("Login gagal, token tidak ditemukan");
            }
        
        // SIMPAN TOKEN KE LOCALSTORAGE
            if (typeof window !== 'undefined') {
            Cookies.set("authToken", token, {
                    expires: 1
            })
            Cookies.set("name", res.data?.data.name)
            toast.success("Login success");
            // setAuthToken(token)
            localStorage.setItem('auth_token', token);
            }
            
            return res.data;

        },"postLogin");


export const postLogout = (): Promise<BaseResponse> => 
    WrapWithCustomError(async () => {
        return await ApiFetchSecured(LOGOUT_URL, {
          method: "POST"  
        })
    },"postLogout");

export const postRegister = (data: RegisterRequest) : Promise<BaseResponse> => 
    WrapWithCustomError(async()=>{
         return await ApiFetchSecured(REGISTER_URL, {
          method: "POST",
          body: JSON.stringify(data)
        })
    },"postRegister");


// export const postEmailVerification = (token: string): Promise<BaseResponse> =>
//     WrapWithCustomError(async () => {
//         return await ApiFetch(EMAIL_VERIFICATION_URL(token), {
//             method: "POST",
//         });
//     }, "postEmailVerification");
