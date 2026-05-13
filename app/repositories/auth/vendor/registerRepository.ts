import { RegisterServerResponse } from "@/app/actions/auth/vendor/register-aciton";
import { RegisterRequest } from "@/app/services/auth/vendor/register-service";
import { ApiErrorRes } from "@/app/utils/ApiErrorRes";
import { api } from "@/lib/api";

export const registerRepository = async (request: RegisterRequest): Promise<ApiResponse<RegisterServerResponse>> => {
    try {
        const { data } = await api.post<ApiResponse<RegisterServerResponse>>('/auth/register', request);
        return data;
    } catch (error) {
        return ApiErrorRes<RegisterServerResponse>(error);
    }
}