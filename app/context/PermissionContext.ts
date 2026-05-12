import { createContext } from "react";

export type PermissionResponse = {
    permissions: string[];
    isLoading: boolean;
}

const initialData: PermissionResponse = {
    permissions: [],
    isLoading: false
}

export const PermissionContext = createContext(initialData);