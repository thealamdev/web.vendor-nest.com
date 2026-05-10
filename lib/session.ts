"use server";

import { cookies } from "next/headers";

export const setAuthCookie = async (authSignature: any) => {
    const cookieStore = await cookies();

    cookieStore.set(
        'auth_cookie',
        JSON.stringify(authSignature),
        {
            httpOnly: true,
            sameSite: "lax",
            maxAge: 60 * 60 * 24 * 7
        }
    );
}