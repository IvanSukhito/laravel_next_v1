import { WrapWithCustomError } from "@/lib/CustomErrorWrapper";
import ProfileResponse from "@/types/responses/profile/ProfileResponse";
import { ApiFetch } from "../ApiFetch";
import { SHOW_PROFILE_URL } from "@/constants/Urls";
import Cookies from "js-cookie";

export const getProfile = (token?: string): Promise<ProfileResponse> => 
    WrapWithCustomError(async()=> {
        const activeToken = token || Cookies.get('authToken');
        const res = await ApiFetch<ProfileResponse>(
            SHOW_PROFILE_URL,
            token ? {
                headers: {
                    // Laravel Sanctum mencari 'Bearer <token>'
                    'Authorization': `Bearer ${activeToken}`,
                    'Accept': 'application/json'
                }
            } : undefined
        )

        if(!res.data){
            throw new Error("Null data response");
        }
        // console.log("profile :",res.data);
        return res.data;

    },"getProfile");
