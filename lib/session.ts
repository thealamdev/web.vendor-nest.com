"use server";

import { cookies } from "next/headers";

export const setCookie = async <T>(key: string, authSignature: T) => {
    const cookieStore = await cookies();

    try {
        cookieStore.set(
            key,
            JSON.stringify(authSignature),
            {
                httpOnly: true,
                sameSite: "lax",
                maxAge: 60 * 60 * 24 * 7
            }
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