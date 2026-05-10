import { LoginServerResponse } from "@/app/actions/auth/vendor/login-action";
import { loginRepository } from "@/app/repositories/auth/vendor/loginRepository";

export type LoginRequest = {
    email: string;
    password: string;
}

export const loginService = async (data: LoginRequest): Promise<ApiResponse<LoginServerResponse>> => {
    const res = await loginRepository(data);
    return res;
}