import { LoginRequest } from "@/app/services/auth/vendor/login-service";
import { api } from "@/lib/api";

export const loginRepository = async (data: LoginRequest) => {
    try {
        const res = await api.post('/auth/login', data);
        return res;
    } catch (error) {
        throw Error(`Got error ${error}`)
    }
}