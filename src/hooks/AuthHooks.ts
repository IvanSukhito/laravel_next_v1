import { postLogin, postLogout, postRegister } from "@/lib/api/repository/AuthRepository";
import { CustomError } from "@/types/CustomError";
import LoginRequest from "@/types/request/auth/login/LoginRequest";
import RegisterRequest from "@/types/request/auth/register/RegisterRequest";
import LoginErrorResponse from "@/types/responses/auth/login/LoginErrorResponse";
import LoginResponse from "@/types/responses/auth/login/LoginResponse";
import { use, useState } from "react";


export function useLogin(){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<CustomError<LoginErrorResponse>>();
    const [authToken, setAuthToken] = useState<string|null>(null)

    const login = async (data: LoginRequest): Promise<LoginResponse | null> => {
        setLoading(true);
        setError(undefined); // <-- Penting: Reset error setiap kali mulai login baru
        try{
            const response = await postLogin(data);
            
            console.log("hasil login", response);
            // if(response.data.status){
            //     Cookies.set("authToken", response.data.data._token, {
            //         expires: 1
            //     })
            //     Cookies.set("name", response.data.data.data.name)
            //     setAuthToken(response.data.data._token)
            //     console.log("response data", response.data.data.data.name)
            //     console.log(response.data.data._token)
            // }
            return response;
            
        // return success;
            // return true;

        }catch(error: unknown){
            if(error instanceof CustomError){
                setError(error);
            }
            console.log("apakah ke mari");
            console.log("Detail Error Login:", error);
            // console.log("Pesan Error:", error.message);
            return null;
        }finally{
            setLoading(false);
        }
        
    }

    return {login, loading, error};
}

export function useLogout(){
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<CustomError>();

    const logout = async (): Promise<boolean> => {
        setLoading(true);

        try{

            const response = await postLogout();
            console.log("logout status", response.status);
            return response.status;

        }catch (error:unknown){

            if(error instanceof CustomError){
                setError(error);
            }

            return false;

        }finally{

            setLoading(false);

        }
    }

    return {logout, loading, error};
}

export function useRegister(){
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<String>("");
    const [error, setError] = useState<CustomError>();

    const register = async (data:RegisterRequest): Promise<boolean> => {
        setLoading(true);
        setError(undefined); // <-- Reset error
        try{
            const res = await postRegister(data);
            setMessage(res.message);
            return true;
        }catch (error:unknown){
            if(error instanceof CustomError){
                setError(error);
            }
            return false;
        }finally{
            setLoading(false);
        }
    }
    return {register, loading, error};
}