import { coreApiFetch, ApiFetchOptions } from "./ApiCore";
import BaseResponse from "@/types/responses/BaseResponse";

export const ApiFetch = async <T>(
    endpoint: string,
    options: ApiFetchOptions = {}
): Promise<BaseResponse<T>> => {
    return coreApiFetch<T>(endpoint, {...options, redirecton401:false});
}

export const ApiFetchSecured = async<T>(
    endpoint: string,
    options: ApiFetchOptions = {}
): Promise<BaseResponse<T>> => {
    return coreApiFetch<T>(endpoint, {...options, redirecton401:true});
}