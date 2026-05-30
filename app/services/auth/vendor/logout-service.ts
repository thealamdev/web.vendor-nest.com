import { logoutRepository } from "@/app/repositories/auth/vendor/logoutRepository";

export const logoutService = async (): Promise<ApiResponse<any>> => {
    const res = await logoutRepository();
    return res;
}