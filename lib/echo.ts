import Echo from "laravel-echo";
import { getCookie } from "./session";
import { CookieEnum } from "@/app/enums/CookieEnum";

let echo: InstanceType<typeof Echo> | null = null;

export async function getEcho(): Promise<InstanceType<typeof Echo> | null> {
    if (typeof window === "undefined") return null;

    if (echo) return echo;

    const Pusher = require("pusher-js");
    (window as any).Pusher = Pusher;

    const cookieStore = await getCookie(CookieEnum.AUTH_COOKIE);

    echo = new Echo({
        broadcaster: "pusher",
        key: "eeb8437513ba70789a3a",
        cluster: "mt1",
        forceTLS: true,
        authEndpoint: `${process.env.NEXT_PUBLIC_API_URL!}/broadcasting/auth`,
        auth: {
            headers: {
                Authorization: `Bearer ${cookieStore?.token}`,
                Accept: "application/json",
            },
        },
    });

    return echo;
}

export default echo;