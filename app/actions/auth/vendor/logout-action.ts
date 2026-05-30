"use server";

import { logoutService } from "@/app/services/auth/vendor/logout-service";

export const logoutAction = async () => {
    const res = await logoutService();
    return res;
};