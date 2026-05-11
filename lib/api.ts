import axios from "axios";
import { getCookie } from "./session";
import { CookieEnum } from "@/app/enums/CookieEnum";

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL!,
    withCredentials: true
});

api.interceptors.request.use(async (config) => {
    const authCookie = await getCookie(CookieEnum.AUTH_COOKIE);
    const orgContextCookie = await getCookie(CookieEnum.ORGANIZATION_CONTEXT)
    if (authCookie) {
        config.headers.Authorization = `Bearer ${authCookie.token}`
    }
    if (orgContextCookie) {
        config.headers.set('X-Organization-Id', orgContextCookie);
    }
    return config;
});