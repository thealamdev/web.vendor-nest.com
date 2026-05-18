"use client";

import { RolePermissionContext, RolePermissionResponse } from "@/app/context/RolePermissionContext";
import { rolePermissionService } from "@/app/services/dashboard/role-permission/role-permission-service";
import { hasPermission } from "@/app/utils/PermissionHandler";
import UnauthorizedComponent from "@/components/utilities/UnauthorizedComponent";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";

type PageProps = {
    roleId: string;
}

const fetchRoles = async (roleId: string) => {
    const res = await rolePermissionService.get(roleId);
    return res;
}

export default function UpdateRolePermissionComponent({
    roleId
}: PageProps) {
    const { permissions, isLoading } = useContext<RolePermissionResponse>(RolePermissionContext);
    const { data, error, isPending } = useQuery({
        queryKey: [`role_permissions:${roleId}`],
        queryFn: () => fetchRoles(roleId)
    });

    if (isPending || isLoading) {
        return <p>Loading...</p>
    }

    return (
        <div>
            {
                hasPermission('role.view', permissions) ? (
                    <div>
                        <pre>{JSON.stringify(data, null, 2)}</pre>
                    </div>
                ) : (
                    <UnauthorizedComponent />
                )
            }
        </div>
    )
}
