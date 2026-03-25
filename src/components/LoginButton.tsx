import React from 'react'
import {FaG} from "react-icons/fa6"

export const LoginGoogleButton = () => {
  return (
    <button className='flex items-center justify-center gap-2 w-full bg-blue-700 
    text-white font-medium py-3 px-6 text-base 
    rounded-sm hover:bg-blue-500 cursor-pointer'>
        <FaG className='size-6'/>
        Sign In With Google
    </button>
  )
}

