import { api } from "@/lib/api";
import { deleteCookie } from "@/lib/session";
import { CookieEnum } from "@/app/enums/CookieEnum";
import { ApiErrorRes } from "@/app/utils/ApiErrorRes";

export const logoutRepository = async (): Promise<ApiResponse<any>> => {
    try {
        const { data } = await api.post('/auth/logout');

        if (data.success) {
            deleteCookie(CookieEnum.AUTH_COOKIE);
            deleteCookie(CookieEnum.ORGANIZATION_CONTEXT);
        }
        return data;

    } catch (error) {
        return ApiErrorRes<any>(error);
    }
}