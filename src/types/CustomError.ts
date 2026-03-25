export class CustomError<T = unknown> extends Error {
    data?: T;
    code?: number;
    constructor(name:string, message: string, data?:T, code?: number){
        super(message);
        this.name = name;
        this.data = data;
        this.code = code;
    }
}