import { createContext } from "react";

export type LogoutContextResponse = {
    userId: string | null;
    refreshAuth: () => void;
}

const initialContext: LogoutContextResponse = {
    userId: '',
    refreshAuth: () => { },
}

export const LogoutContext = createContext(initialContext);