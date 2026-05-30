"use client";

import React, { useEffect, useState } from "react";
import { LogoutContext } from "../context/LogoutContext";
import echo, { getEcho } from "@/lib/echo";
import { getAuthUserId } from "@/lib/auth";
import { toast } from "sonner";

export default function LogoutProvider({ children }: { children: React.ReactNode }) {
    const [userId, setUserId] = useState<string | null>(null);

    const refreshAuth = async () => {
        const id = await getAuthUserId();
        setUserId(id);
    };

    useEffect(() => {
        refreshAuth();
    }, []);

    useEffect(() => {
        const onFocus = () => {
            refreshAuth(); // re-check cookie when user comes back to tab
        };

        window.addEventListener("focus", onFocus);

        return () => window.removeEventListener("focus", onFocus);
    }, []);

    useEffect(() => {
        if (!userId) return;

        let channelName: string;

        const subscribe = async () => {
            const echoInstance = await getEcho();
            if (!echoInstance) return;

            channelName = `user.logout.${userId}`;

            echoInstance.private(channelName).listen(".user.logout", () => {
                toast.success("You have been logged out.");
                window.location.href = "/";
            });
        };

        subscribe();

        return () => {
            if (channelName) {
                getEcho().then(e => e?.leave(channelName));
            }
        };
    }, [userId]);
    return (
        <LogoutContext.Provider value={{ userId, refreshAuth }}>
            {children}
        </LogoutContext.Provider>
    );
}