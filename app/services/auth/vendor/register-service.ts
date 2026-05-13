import { RegisterServerResponse } from "@/app/actions/auth/vendor/register-aciton";
import { registerRepository } from "@/app/repositories/auth/vendor/registerRepository";

export type RegisterRequest = {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export const registerService = async (data: RegisterRequest): Promise<ApiResponse<RegisterServerResponse>> => {
    const res = await registerRepository(data);
    return res;
}