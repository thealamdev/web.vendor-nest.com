import { getEcho } from "@/lib/echo";
import { toast } from "sonner";

let isListening = false;

export async function startLogoutListener(userId: string) {
    if (isListening) return;
    isListening = true;

    const echo = await getEcho();
    if (!echo) return;

    const channelName = `user.logout.${userId}`;
    console.log("Starting logout listener on:", channelName);

    echo.private(channelName).listen(".user.logout", (e: any) => {
        console.log("LOGOUT EVENT FIRED:", e);
        toast.success("You have been logged out from another device.");

        // Hard reload — completely outside React lifecycle
        setTimeout(() => {
            window.location.href = "/";
        }, 500);
    });
}

export async function stopLogoutListener(userId: string) {
    isListening = false;
    const echo = await getEcho();
    if (!echo) return;
    echo.leave(`user.logout.${userId}`);
}