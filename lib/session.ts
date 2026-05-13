"use server";

import { cookies } from "next/headers";

const COOKIE_OPTIONS = {
    httpOnly: true,
    sameSite: "lax" as const,
    maxAge: 60 * 60 * 24 * 7,
};

export const setCookie = async <T>(key: string, value: T) => {
    const cookieStore = await cookies();

    try {
        cookieStore.set(
            key,
            JSON.stringify(value),
            COOKIE_OPTIONS
        );
        return true;

    } catch (error) {
        throw Error(`Got Error ${error}`)
    }
}

export const updateCookie = async<T>(key: string, value: T) => {
    const cookieStore = await cookies();
    const existing = cookieStore.get(key);
    if (!existing) throw new Error(`Cookie "${key}" not found`);

    try {
        cookieStore.set(
            key,
            JSON.stringify(value),
            COOKIE_OPTIONS
        );
        return true;

    } catch (error) {
        throw Error(`Got Error ${error}`)
    }

}

export const getCookie = async (key: string) => {
    const cookieStore = await cookies();

    const res = cookieStore.get(key)?.value;
    const parseRes = res && JSON.parse(res);
    return parseRes;
}

export const deleteCookie = async (key: string) => {
    const cookieStore = await cookies();
    cookieStore.delete(key);
}