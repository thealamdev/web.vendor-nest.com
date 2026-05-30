import { getCookie } from "@/lib/session";
import { CookieEnum } from "@/app/enums/CookieEnum";

export const getAuthUserId = async () => {
    const authCookie = await getCookie(CookieEnum.AUTH_COOKIE);
    return authCookie?.user?.id || null;
};