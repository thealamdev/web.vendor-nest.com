import { loginRepository } from "@/app/repositories/auth/vendor/loginRepository";

export type LoginRequest = {
    email: string;
    password: string;
}

export const loginService = async(data: LoginRequest) => {
    const res = await loginRepository(data);
    return res.data;
}