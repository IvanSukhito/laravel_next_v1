import { WrapWithCustomError } from "@/lib/CustomErrorWrapper";
import ProfileResponse from "@/types/responses/profile/ProfileResponse";
import { ApiFetch } from "../ApiFetch";
import { SHOW_PROFILE_URL } from "@/constants/Urls";
import { Cookie } from "next/font/google";

export const getProfile = (token?: string): Promise<ProfileResponse> => 
    WrapWithCustomError(async()=> {
        const res = await ApiFetch<ProfileResponse>(
            SHOW_PROFILE_URL,
            token ? {
                headers: {
                    Cookie: `authToken: ${token}`
                }
            } : undefined
        )

        if(!res.data){
            throw new Error("Null data response");
        }
        console.log("profile :",res.data);
        return res.data;

    },"getProfile");
