"use server";

import { CookieEnum } from "@/app/enums/CookieEnum";
import { LoginRequest, loginService } from "@/app/services/auth/vendor/login-service";
import { setCookie } from "@/lib/session";

export type LoginServerResponse = {
    token: string;
    hasMembership: boolean;
    user: {
        name: string;
        email: string;
        phone?: string;
    };
}

export const loginAction = async (formData: LoginRequest): Promise<ApiResponse<LoginServerResponse>> => {
    const res = await loginService(formData);
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