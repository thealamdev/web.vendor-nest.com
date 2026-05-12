import { createContext } from "react";

export type RolePermissionResponse = {
    roleId: string;
    roles: any[],
    permissions: string[];
    isLoading: boolean;
    changeRole: (roleId: string) => void;
}

const initialData: RolePermissionResponse = {
    roleId: '',
    roles: [],
    permissions: [],
    isLoading: false,
    changeRole : () => {}
}

export const RolePermissionContext = createContext(initialData);