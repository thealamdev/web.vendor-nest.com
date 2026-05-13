"use server";

import { CookieEnum } from "@/app/enums/CookieEnum";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const logoutAction = async () => {
    const cookieStore = await cookies();

    cookieStore.delete(CookieEnum.AUTH_COOKIE);
    cookieStore.delete(CookieEnum.ORGANIZATION_CONTEXT);

    redirect("/");
};