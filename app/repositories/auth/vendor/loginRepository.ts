import { LoginServerResponse } from "@/app/actions/auth/vendor/login-action";
import { LoginRequest } from "@/app/services/auth/vendor/login-service";
import { ApiErrorRes } from "@/app/utils/ApiErrorRes";
import { api } from "@/lib/api";

export const loginRepository = async (request: LoginRequest): Promise<ApiResponse<LoginServerResponse>> => {
    try {
        const { data } = await api.post<ApiResponse<LoginServerResponse>>('/auth/login', request);
        return data;
    } catch (error) {
        return ApiErrorRes<LoginServerResponse>(error);
    }
}