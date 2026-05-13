"use server";

import { CookieEnum } from "@/app/enums/CookieEnum";
import { RegisterRequest, registerService } from "@/app/services/auth/vendor/register-service";
import { setCookie } from "@/lib/session";

export type RegisterServerResponse = {
    token: string;
    hasMembership: boolean;
    user: {
        name: string;
        email: string;
        phone?: string;
    };
}

export const registerAction = async (formData: RegisterRequest): Promise<ApiResponse<RegisterServerResponse>> => {
    const res = await registerService(formData);
    if (!res.success) {
        return res;
    }
    const token = res?.payload.token;
    const authInfo = res?.payload.user;

    const collection = {
        token: token,
        user: authInfo,
        hasMemberships: res?.payload.hasMembership
    }

    const cookies = await setCookie(CookieEnum.AUTH_COOKIE, collection);

    return res;
}