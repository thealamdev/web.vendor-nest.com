"use client";

import { useCallback, useContext } from "react";
import { RolePermissionContext, RolePermissionResponse } from "../context/RolePermissionContext";

const usePermission = () => {
    const { permissions, isLoading } =
        useContext<RolePermissionResponse>(RolePermissionContext);

    const hasPermission = useCallback(
        (permission: string): boolean => {
            if (isLoading) return false;

            return permissions?.includes(permission) ?? false;
        },
        [permissions, isLoading]
    );

    return {
        permissions,
        hasPermission,
        isHookLoasing: isLoading,
    };
};

export default usePermission;