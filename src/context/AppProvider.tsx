"use client";

import { stringify } from "querystring";
import Loader from "@/components/Loader";
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";


interface AppProviderType{

    isLoading: boolean,
    authToken: string | null,
    login: (email: string, password: string) => Promise<void>,
    register: (name: string, email: string, password: string, confirm_password: string) => Promise<void>,
    logout: () => void
}

const AppContext = createContext<AppProviderType | undefined>(undefined)

const API_BE_URL = `${process.env.NEXT_PUBLIC_BE_URL}`

export const AppProvider = ({
  children,
}: {
  children: React.ReactNode,
}) => {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [authToken, setAuthToken] = useState<string|null>(null)
    const router = useRouter()

    useEffect(() => {
        const token = Cookies.get("authToken");
        if(token){
            setAuthToken(token)
        }else{
            router.push('/sign-in')
        }
    })
    

    const login = async (email:string, password: string) =>  {

        setIsLoading(true)
        try {
            const response = await axios.post(`${API_BE_URL}/login`,{
                email,
                password
            })

            if(response.data.status){
                Cookies.set("authToken", response.data.data._token, {
                    expires: 1
                })
                toast.success("Login success");
                setAuthToken(response.data.data._token)
                router.push('/my/dashboard')
                console.log(response.data.data._token)
            }else{
                toast.success("Invalid Login Details");
            }

            console.log(response)

        } catch (error) {
            console.log(error)
        } 
        finally {
            setIsLoading(false)
        }
    }
    const register = async (name: string, email: string, password: string, confirm_password: string) => {

        setIsLoading(true)
        try {
            const response = await axios.post(`${API_BE_URL}/register`,{
                name,
                email,
                password,
                confirm_password,
            })

            console.log(response)
        } catch (error) {
            console.log(error)
        }
        finally{
            setIsLoading(false)
        }
    }

    const logout = () => {
        setAuthToken(null)
        Cookies.remove("authToken")
        setIsLoading(false)
        toast.success("Successfuly logout")
        router.push("/sign-in")
    }

    return (
        <AppContext.Provider value = { { login,register, isLoading, authToken, logout } }>
            {/* {children} */}
            {isLoading ? <Loader/> : children}
        </AppContext.Provider>
    )
}

export const myAppHook = () => {
    const context = useContext(AppContext);
    if(!context){

        throw new Error("Context will be wrapped inside AppProvider");
    }
    return context;
}