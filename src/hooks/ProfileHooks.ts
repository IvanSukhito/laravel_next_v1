import { getProfile } from "@/lib/api/repository/ProfileRepository";
import { CustomError } from "@/types/CustomError";
import Profile from "@/types/Profile";
import { useState } from "react";

export function useProfile(){
    const [profile, setProfile] = useState<Profile>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<CustomError>();

    const fetchProfile = async() =>{
        setLoading(true);
        try{
            setProfile(await getProfile());
        }catch (error: any){
            setError(error);
            setProfile(undefined);
        }finally{
            setLoading(false);
        }
    }

    return  {fetchProfile, setProfile, profile, loading, error};
}