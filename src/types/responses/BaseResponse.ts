type BaseResponse<T = unknown> = {
    status: boolean;
    message: string;
    data?: T;
    _token: string;
};

export default BaseResponse;