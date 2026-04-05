"use client";

import { useLogin, useLogout, useRegister } from "@/hooks/AuthHooks";
import { useProfile } from "@/hooks/ProfileHooks";
import { CustomError } from "@/types/CustomError";
import LoginErrorResponse from "@/types/responses/auth/login/LoginErrorResponse";
import React, { useCallback, useContext, useEffect, useMemo } from "react";
import { createContext } from 'react'; // Pastikan dari 'react'
import Cookies from 'js-cookie';


type ProfileContextType = {
    authToken: string | null,
    profile: ReturnType<typeof useProfile>["profile"];
    profileLoading: boolean;
    profileReady: boolean;
    profileError: CustomError | undefined;
    refreshProfile: (data?: any) => Promise<void>;

    login: (data: Parameters<ReturnType<typeof useLogin>["login"]>[0]) => Promise<boolean>;
    loginLoading: boolean;
    loginError: CustomError<LoginErrorResponse> | undefined;
    
    logout: (data?: any) => Promise<boolean>;
    logoutLoading: boolean;
    logoutError: CustomError | undefined;

    register: (data: Parameters<ReturnType<typeof useRegister>["register"]>[0]) => Promise<boolean>;
    registerLoading: boolean;
    registerError: CustomError | undefined;
};

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

type ProfileProviderProps = {
    children: React.ReactNode;
    initialProfile?: ReturnType<typeof useProfile>["profile"];
}

export const ProfileProvider: React.FC<ProfileProviderProps> = ({children, initialProfile}) => {
    const [authToken, setAuthToken] = React.useState<string|null>(null);
    const {profile, setProfile, fetchProfile, loading: profileLoading, error: profileError} = useProfile();
    const [isLoggingOut, setIsLoggingOut] = React.useState(false);
    const [profileReady, setProfileReady] = React.useState(false);

    // console.log(fetchProfile);   

    const {login: doLogin, loading: loginLoading, error: loginError} = useLogin();
    const {logout: doLogout, loading: logoutLoading, error: logoutError} = useLogout();
    const { register: doRegister, loading: registerLoading, error: registerError } = useRegister();


    const refreshProfile = useCallback(async (authToken?: string) => {
        await fetchProfile(authToken);

        if (isLoggingOut) {
        setProfile(undefined);
        }
    },[fetchProfile, setProfile, isLoggingOut]);

     useEffect(() => {
     const initAuth = async () => {
        // 1. Cek apakah ada data dari server (SSR)
        if (initialProfile !== undefined) {
            setProfile(initialProfile);
            setProfileReady(true);
            return; // Berhenti di sini jika sudah ada data server
        }

        // 2. Jika tidak ada data server (berarti user baru saja REFRESH)
        const savedToken = Cookies.get('authToken');
        if (savedToken) {
            try {
                // Ambil data terbaru dari API menggunakan token di Cookie
                await refreshProfile(savedToken); 
            } catch (err) {
                console.error("Token tidak valid saat refresh", err);
                Cookies.remove('authToken');
            }
        }

        // 3. Tandai proses inisialisasi selesai
        setProfileReady(true);
    };

    initAuth();
    }, [initialProfile,setProfile]);

    const login = useCallback(async (data: Parameters<typeof doLogin>[0]) => {
        const res = await doLogin(data);
        const token = res?.data?._token || res?._token;
        console.log("tesssss", res);
        if(res){
            await refreshProfile(token);
            setAuthToken(res._token);
            setProfileReady(true);
            return true;
        }
        return false;
    },[doLogin, refreshProfile]);

    const logout = useCallback(async (authToken?: string) => {
        const success = await doLogout();
        // if (success) {
            console.log("udah logout");
            await refreshProfile(authToken);
            setAuthToken(null);
            setProfile(undefined);
            Cookies.remove('authToken');
            Cookies.remove('name');
            localStorage.removeItem('authToken');
            setProfileReady(true); // Jika kamu pakai localStorage juga
        // }
        return true;
    }, [doLogout]);

    // const logout = useCallback(async () => {
    //     const success = await doLogout();
    //     console.log("sukses logout", success);

    //     // Apapun hasilnya (sukses atau gagal dari BE), kita harus bersih-bersih di FE
    //     if(success || !success) { 
    //         // JANGAN panggil refreshProfile() di sini karena token udah dibuang
    //         Cookies.remove("authToken")
    //         setAuthToken(null);
    //         setProfile(undefined);
    //     }
    //     return true; // Paksa return true biar router.push di komponen jalan
    // }, [doLogout, setProfile]);

    const register = useCallback(async (data: Parameters<typeof doRegister>[0]) => {
    const success = await doRegister(data);
    if (success) {
        // Biasanya setelah register tidak langsung refresh profile 
        // kecuali API register otomatis melakukan login.
        // Jika tidak, biarkan user login manual.
    }
    return success;
    }, [doRegister]);

    const value = useMemo(
        () => ({
            profile,
            profileLoading,
            profileError,
            profileReady,
            refreshProfile,
            login,
            loginError,
            loginLoading,
            logout,
            logoutError,
            logoutLoading,
            // Tambahkan ini:
            register,
            registerLoading,
            registerError,
            authToken,
        }),[
            profile,
            profileLoading,
            profileError,
            profileReady,
            refreshProfile,
            login,
            loginLoading,
            loginError,
            logout,
            logoutError,
            logoutLoading,
            // Dan tambahkan dependency-nya di sini:
            register,
            registerLoading,
            registerError,
            authToken,

        ]
    );

    return <ProfileContext.Provider value={value}>
            {children}
            </ProfileContext.Provider>
}

export const useProfileContext = () => {
    const context = useContext(ProfileContext);
    if(!context){
        throw new Error("use Profile harus digunakan dengan ProfileProveider")
    }
    return context;
}
