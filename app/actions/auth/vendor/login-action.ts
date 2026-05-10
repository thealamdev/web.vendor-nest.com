"use server";

import { LoginRequest, loginService } from "@/app/services/auth/vendor/login-service";
import { setAuthCookie } from "@/lib/session";

type LoginResponse = {
    name: string;
    email: string;
    hasMemberships: boolean;
}

export const loginAction = async (formData: LoginRequest): Promise<LoginResponse> => {
    const res = await loginService(formData);
    const token = res?.payload.token;
    const authInfo = res?.payload.user;

    const collection = {
        token: token,
        user: authInfo,
        hasMemberships: res.payload.memberships.length > 0 ? true : false
    }

    const cookies = await setAuthCookie(collection)
    return {
        name: collection.user.name,
        email: collection.user.email,
        hasMemberships: collection.hasMemberships
    };
}