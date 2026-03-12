"use client";

import React, { useEffect } from 'react'
import { myAppHook } from '@/context/AppProvider'
import { useRouter } from 'next/navigation';

const MyDashboardPage = () => {

    const {isLoading, authToken} = myAppHook();
    const router = useRouter();

    useEffect(() => {
        if(!authToken){
            router.push("/sign-in")
            return 
        }
    },[authToken])
  return (
    <div>
        <h1>Welcome after login</h1>
    </div>
  )
}

export default MyDashboardPage