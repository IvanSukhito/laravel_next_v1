type BaseResponse<T = unknown> = {
    status: boolean;
    message: string;
    data?: T;

};

export default BaseResponse;