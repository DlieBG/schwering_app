export interface LoginDto {
    jwt: string;
}

export interface LoginJwt {
    id: string;
    name: string;
    iat: number;
    exp: number;
}
