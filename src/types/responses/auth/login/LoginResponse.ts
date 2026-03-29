type LoginResponse = {
    accessToken: string;
    tokenType: string;
    email: string;
    expiresIn: number;
    // _token: string;
    data: {
        id: number;
        name: string;
        email: string;
        phone_number: string;
        _token: string;
        // ... field lainnya sesuai hasil console log tadi
    };
    _token: string; // TAMBAHKAN BARIS INI
};

export default LoginResponse;