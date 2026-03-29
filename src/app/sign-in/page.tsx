"use client";

import React, { useState, useEffect } from 'react'
import { LoginGoogleButton } from '@/components/LoginButton'
import { Metadata } from 'next'
import {FaEye, FaEyeSlash} from "react-icons/fa6"
import { myAppHook } from '@/context/AppProvider';
import { useRouter } from 'next/navigation';
import { useProfileContext } from '@/context/ProfileContext';
// export const metadata:Metadata = {
//     title : "Sign In",
// }

interface formData{
    name?: string,
    email: string,
    password: string,
    confirm_password?: string,
}

const SignInPage = () => {

  const [showPassword, setshowPassword] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  const [formData, setFormData] = useState<formData>({
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  });

  const router = useRouter();

//   const { login, register, authToken, isLoading } = myAppHook();
  const { register, login, loginLoading, loginError, refreshProfile } = useProfileContext(); 

//   useEffect(() => {
//     if(authToken){
//         router.push("/my/dashboard")
//     }
//   }, [authToken, isLoading])

  const handleOnChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
        ...formData,
        [event.target.name] : event.target.value
    })
  }

//   const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
//     event.preventDefault();
//     if(isLogin){

//         try {
            
//             await login(formData.email, formData.password)
//             alert("Login Submited");

//         } catch (error) {
//             console.log(`Error Auth ${error}`)
//         }
        
//     }else{

//         try {
            
//             await register(formData.name!, formData.email, formData.password, formData.confirm_password!)
//             alert("Register Submited"); 
        
//         } catch (error) {
            
//             console.log(`Error Auth ${error}`)
            
//         }
        
//     }
//   }

const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("email", formData.email);
    if (isLogin) {
        const success = await login({
            email: formData.email,
            password: formData.password
        });
        if (success){
            router.push("/my/dashboard");
            console.log("sukses login");
        }
    } else {
        // LOGIKA SIGN UP
        if (formData.password !== formData.confirm_password) {
            alert("Password tidak cocok!");
            return;
        }
        
        const success = await register({
          name: formData.name || "",
          email: formData.email || "",
          password: formData.password || "",
          confirmPassword: formData.confirm_password || ""
        });

        if (success) {
            alert("Registrasi berhasil! Silakan login.");
            setIsLogin(true); // Pindah ke form login
        }
    }
};
  useEffect(() => {
  console.log("Status Password Saat Ini:", showPassword);
  }, [showPassword]); // Ini artinya: "Jalanin log ini setiap kali showPassword berubah"

  return (
    <div className='min-h-screen flex items-center'> 
        <div className="bg-white w-96 mx-auto rounded-sm shadow p-8">          
   
            <h1 className='text-4xl font-bold mb-1'>
                {isLogin ? 'Sign In' : 'Sign Up'} 
            </h1>
            <p className='font-medium mb-5 text-gray-500'>
                {isLogin ? 'Sign in to your account' : 'Regist your account'}
            </p> 

        <form onSubmit={handleFormSubmit}>

       
            {/* form */}
            {!isLogin && (
                <>
                    <p className='font-bold pb-2'>Name </p>
                    <div className="relative w-full">
                        <input 
                        type="text" 
                        onChange={handleOnChangeInput}
                        value={formData.name}
                        className='px-2 w-full h-10 border bg-amber-100 rounded-sm' 
                        name="name" 
                        placeholder='your name' 
                        required/>
                    </div>

                </>
            )}
            <p className='font-bold pb-2'>Email </p>
            <div className="relative w-full">
                <input 
                type="email" 
                onChange={handleOnChangeInput}
                value={formData.email}
                className='px-2 w-full h-10 border bg-amber-100 rounded-sm' 
                name="email" 
                placeholder='yourmail@mail.com' 
                required/>
            </div>

            <p className='font-bold pb-2'>Password </p>
            <div className="relative w-full">

                <input 
                type={showPassword ? "text" : "password" } 
                onChange={handleOnChangeInput}
                value={formData.password}
                className='px-2 pr-10 w-full h-10 border bg-amber-100 rounded-sm' 
                name="password" 
                placeholder='******' 
                required/>

                <div className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600" onClick={()=> setshowPassword(!showPassword)}>
                {/* logics */}
                {showPassword ? <FaEyeSlash/> : <FaEye/> }
                </div>
            </div>
            {!isLogin && (
                <>
                <p className='font-bold pb-2'>Confirm Password </p>
                <div className="relative w-full">
                    <input 
                    type={showPassword ? "text" : "password" } 
                    onChange={handleOnChangeInput}
                    value={formData.confirm_password}
                    className='px-2 pr-10 w-full h-10 border bg-amber-100 rounded-sm' 
                    name="confirm_password" 
                    placeholder='******' 
                    required/>

                    <div className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-600" onClick={()=> setshowPassword(!showPassword)}>
                    {/* logics */}
                    {showPassword ? <FaEyeSlash/> : <FaEye/> }
                    </div>
                </div>
                </>
            )}

          
            {/* /* tambahin sign in with form */}
            <div className='py-4 text-center'>
                {isLogin && (
                <>
                <button className='flex items-center justify-center gap-2 w-full bg-blue-500 
                 text-white font-medium py-3 px-6 text-base 
                 rounded-sm hover:bg-blue-700 cursor-pointer mb-2' type='submit'>Sign In</button>
                <LoginGoogleButton/>
                    <p className='mt-5 text-black-100'>Don't have any account ? <b className='cursor-pointer text-blue-500' onClick={()=> setIsLogin(!isLogin)}>Sign Up</b></p> 
                </>
                )}
                {!isLogin && (
                    <>
                    <button className='flex items-center justify-center gap-2 w-full bg-blue-500 
                     text-white font-medium py-3 px-6 text-base 
                     rounded-sm hover:bg-blue-700 cursor-pointer mb-2' type='submit'>Sign Up</button>

                    <p className='mb-5 text-black-100'>Already have account ? <b className='cursor-pointer text-orange-500' onClick={()=> setIsLogin(!isLogin)}>Sign In</b></p> 
                    </>
                )}
            </div>
        </form>
        </div>
    </div>
  )
}

export default SignInPage