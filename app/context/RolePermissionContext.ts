import { createContext } from "react";

export type RolePermissionResponse = {
    permissions: string[];
    isLoading: boolean;
}

const initialData: RolePermissionResponse = {
    permissions: [],
    isLoading: false,
}

export const RolePermissionContext = createContext(initialData);