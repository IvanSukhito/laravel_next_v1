import { CustomError } from "@/types/CustomError";

export const WrapWithCustomError = async <T>(

    fn: () => Promise<T>,
    context: string = "repository"
): Promise <T> => {

    try{
        return await fn();
    }catch (error:any){
        if(error instanceof CustomError){
            throw error;
        }
        throw new CustomError(context, error?.message ?? "Unexpected error", false);
    }
};